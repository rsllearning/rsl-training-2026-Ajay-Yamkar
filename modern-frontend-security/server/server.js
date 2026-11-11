const express = require("express");
const path = require("path");

const { user, defaultSettings } = require("./data");

const app = express();
const PORT = process.env.PORT || 3000;
const clientDirectory = path.join(__dirname, "..", "client");
const allowedSettings = new Set(["theme", "language", "fontSize"]);
const settingValues = {
    theme: new Set(["light", "dark"]),
    language: new Set(["en", "fr"]),
    fontSize: new Set(["small", "medium", "large"])
};

// These response headers provide defense in depth for every page and API.
app.use((req, res, next) => {
    res.set({
        "Content-Security-Policy": [
            "default-src 'self'",
            "script-src 'self'",
            "style-src 'self'",
            "img-src 'self'",
            "object-src 'none'",
            "base-uri 'self'",
            "form-action 'self'",
            "frame-ancestors 'none'"
        ].join("; "),
        "X-Frame-Options": "DENY",
        "X-Content-Type-Options": "nosniff",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        "Permissions-Policy": "camera=(), microphone=(), geolocation=()"
    });
    next();
});

app.use(express.json({ limit: "10kb" }));

function publicProfile(source) {
    // Only return fields that the browser needs. Credentials remain server-side.
    return {
        id: source.id,
        name: source.name,
        email: source.email,
        role: source.role
    };
}

function validateSettings(value) {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
        return null;
    }

    const keys = Object.keys(value);
    if (keys.length !== allowedSettings.size || keys.some((key) => !allowedSettings.has(key))) {
        return null;
    }

    const settings = Object.create(null);
    for (const key of allowedSettings) {
        if (!Object.hasOwn(value, key) || !settingValues[key].has(value[key])) {
            return null;
        }
        settings[key] = value[key];
    }
    return settings;
}

app.get("/", (req, res) => {
    res.sendFile(path.join(clientDirectory, "index.html"));
});

app.get("/account", (req, res) => {
    res.sendFile(path.join(clientDirectory, "account.html"));
});

app.get("/api/profile", (req, res) => {
    res.set("Cache-Control", "no-store").json(publicProfile(user));
});

app.get("/api/settings", (req, res) => {
    res.set("Cache-Control", "no-store").json({ ...defaultSettings });
});

app.post("/api/settings", (req, res) => {
    const settings = validateSettings(req.body);
    if (!settings) {
        return res.status(400).json({ error: "Invalid settings." });
    }

    return res.json({
        message: "Settings saved successfully.",
        settings
    });
});

app.use(express.static(clientDirectory, {
    dotfiles: "deny",
    index: false,
    setHeaders(res) {
        res.setHeader("X-Content-Type-Options", "nosniff");
    }
}));

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Application running at http://localhost:${PORT}`);
    });
}

module.exports = { app, publicProfile, validateSettings };
