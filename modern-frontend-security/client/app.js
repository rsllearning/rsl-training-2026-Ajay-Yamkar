const app = document.getElementById("app");

function renderProfile(profile) {
    const params = new URLSearchParams(window.location.search);
    const requestedName = params.get("name");
    const displayName = requestedName || profile.name || "Guest";

    const card = document.createElement("section");
    card.className = "profile-card";

    const heading = document.createElement("h2");
    heading.textContent = `Welcome, ${displayName}`;

    const email = document.createElement("p");
    email.textContent = `Email: ${profile.email || "Unknown"}`;

    const role = document.createElement("p");
    role.textContent = `Role: ${profile.role || "User"}`;

    card.append(heading, email, role);
    app.replaceChildren(card);
}

async function loadProfile() {
    try {
        const response = await fetch("/api/profile", {
            headers: { Accept: "application/json" },
            credentials: "same-origin"
        });
        if (!response.ok) throw new Error("Profile request failed");
        renderProfile(await response.json());
    } catch {
        renderProfile({ name: "Guest", email: "Unknown", role: "User" });
    }
}

const saveButton = document.getElementById("save-settings");
saveButton.addEventListener("click", async () => {
    const settings = {
        theme: document.getElementById("theme").value,
        language: document.getElementById("language").value,
        fontSize: document.getElementById("fontSize").value
    };

    const status = document.getElementById("settings-status");
    try {
        const response = await fetch("/api/settings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "same-origin",
            body: JSON.stringify(settings)
        });
        const result = await response.json();
        if (!response.ok) throw new Error("Settings request failed");
        status.textContent = result.message;
    } catch {
        status.textContent = "Unable to save settings.";
    }
});

if (document.getElementById("account-name")) {
    fetch("/api/profile", {
        headers: { Accept: "application/json" },
        credentials: "same-origin"
    })
        .then((response) => {
            if (!response.ok) throw new Error("Profile request failed");
            return response.json();
        })
        .then((profile) => {
            document.getElementById("account-name").textContent = profile.name;
            document.getElementById("account-email").textContent = profile.email;
            document.getElementById("account-role").textContent = profile.role;
        })
        .catch(() => {
            document.getElementById("account-status").textContent =
                "Unable to load account details.";
        });

    document.getElementById("delete-account").addEventListener("click", () => {
        document.getElementById("account-status").textContent =
            "Account deletion action triggered.";
    });
} else {
    loadProfile();
}
