const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const { app } = require("../server/server");
const clientDirectory = path.join(__dirname, "..", "client");

let server;
let baseUrl;

test.before(async () => {
    server = app.listen(0, "127.0.0.1");
    await new Promise((resolve) => server.once("listening", resolve));
    baseUrl = `http://127.0.0.1:${server.address().port}`;
});

test.after(async () => {
    await new Promise((resolve, reject) => {
        server.close((error) => error ? reject(error) : resolve());
    });
});

test("DOM XSS: query string is treated as text, not HTML", async () => {
    const clientCode = fs.readFileSync(path.join(clientDirectory, "app.js"), "utf8");
    const html = await fetch(`${baseUrl}/?name=%3Cimg%20src%3Dx%20onerror%3Dalert(1)%3E`)
        .then((response) => response.text());

    assert.match(clientCode, /textContent\s*=\s*`Welcome, \$\{displayName\}`/);
    assert.doesNotMatch(clientCode, /\.innerHTML\s*=/);
    assert.doesNotMatch(html, /window\.initialUser\s*=/);
});

test("prototype pollution: settings accept valid values and reject dangerous keys", async () => {
    const validResponse = await fetch(`${baseUrl}/api/settings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme: "dark", language: "fr", fontSize: "large" })
    });
    assert.equal(validResponse.status, 200);
    assert.deepEqual((await validResponse.json()).settings, {
        theme: "dark", language: "fr", fontSize: "large"
    });

    const attackResponse = await fetch(`${baseUrl}/api/settings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: '{"theme":"dark","language":"en","fontSize":"small","__proto__":{"isAdmin":true}}'
    });
    assert.equal(attackResponse.status, 400);
    assert.equal(Object.prototype.isAdmin, undefined);

    const invalidValueResponse = await fetch(`${baseUrl}/api/settings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme: "dark; background: url(evil)", language: "en", fontSize: "small" })
    });
    assert.equal(invalidValueResponse.status, 400);
});

test("SSR token leakage: page and profile API expose only public fields", async () => {
    const [page, profileResponse, account] = await Promise.all([
        fetch(baseUrl).then((response) => response.text()),
        fetch(`${baseUrl}/api/profile`),
        fetch(`${baseUrl}/account`).then((response) => response.text())
    ]);
    const profile = await profileResponse.json();

    assert.deepEqual(Object.keys(profile).sort(), ["email", "id", "name", "role"]);
    for (const secret of ["TRAINING-FAKE-ACCESS-TOKEN-12345", "TRAINING-FAKE-REFRESH-TOKEN-67890", "sessionToken", "refreshToken"]) {
        assert.equal(page.includes(secret), false);
        assert.equal(account.includes(secret), false);
        assert.equal(JSON.stringify(profile).includes(secret), false);
    }
    assert.equal(profileResponse.headers.get("cache-control"), "no-store");
});

test("CSP: scripts and styles are same-origin and pages contain no inline code", async () => {
    for (const route of ["/", "/account"]) {
        const response = await fetch(`${baseUrl}${route}`);
        const policy = response.headers.get("content-security-policy");
        const html = await response.text();

        assert.match(policy, /script-src 'self'/);
        assert.match(policy, /style-src 'self'/);
        assert.doesNotMatch(policy, /unsafe-inline|unsafe-eval/);
        assert.doesNotMatch(html, /<script\s*>|<style\s*>/i);
    }
});

test("clickjacking: page responses deny framing", async () => {
    const response = await fetch(`${baseUrl}/account`);
    assert.equal(response.headers.get("x-frame-options"), "DENY");
    assert.match(response.headers.get("content-security-policy"), /frame-ancestors 'none'/);
});

test("dashboard and account routes remain available", async () => {
    const [dashboard, account] = await Promise.all([
        fetch(baseUrl),
        fetch(`${baseUrl}/account`)
    ]);
    assert.equal(dashboard.status, 200);
    assert.equal(account.status, 200);
    assert.match(await dashboard.text(), /save-settings/);
    assert.match(await account.text(), /delete-account/);
});
