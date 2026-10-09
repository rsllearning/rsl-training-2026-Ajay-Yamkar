const API_BASE_URL = "https://api.github.com";
const REFRESH_INTERVAL = 60 * 1000;

const usernameInput = document.getElementById("username");
const trackButton = document.getElementById("trackButton");
const statusElement = document.getElementById("status");
const ownerSection = document.getElementById("ownerSection");
const ownerDetails = document.getElementById("ownerDetails");
const repositoriesSection = document.getElementById("repositoriesSection");
const repositoriesElement = document.getElementById("repositories");
const repoCountElement = document.getElementById("repoCount");

let refreshTimer = null;
let currentUsername = null;

trackButton.addEventListener("click", trackUser);

usernameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    trackUser();
  }
});

async function trackUser() {
  const username = usernameInput.value.trim();

  if (!username) {
    showError("Please enter a GitHub username.");
    return;
  }

  currentUsername = username;
  const loaded = await refreshData();

  if (loaded) {
    startAutomaticRefresh();
  }
}

async function refreshData() {
  if (!currentUsername) {
    return;
  }

  setLoading(true);
  clearResults();

  try {
    // Part 1: fetch all public repositories.
    const repositories = await fetchAllRepositories(currentUsername);

    // Part 2: fetch the tracked user's profile independently.
    // This also works when the user has zero public repositories.
    const ownerPromise = fetchUser(currentUsername);

    // Fetch owners represented by repositories asynchronously.
    // Promise.all allows multiple owner requests to execute concurrently.
    const ownersPromise = fetchOwnersForRepositories(repositories);

    const [owner, owners] = await Promise.all([ownerPromise, ownersPromise]);

    renderOwner(owner);
    renderRepositories(repositories, owners);

    if (repositories.length === 0) {
      setStatus(
        `@${currentUsername} has no public repositories. Last checked at ${new Date().toLocaleTimeString()}`,
        "success"
      );
    } else {
      setStatus(
        `Last refreshed at ${new Date().toLocaleTimeString()}`,
        "success"
      );
    }

    return true;
  } catch (error) {
    handleError(error);
    return false;
  } finally {
    setLoading(false);
  }
}

async function fetchAllRepositories(username) {
  const repositories = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const url =
      `${API_BASE_URL}/users/${encodeURIComponent(username)}/repos` +
      `?type=all&per_page=${perPage}&page=${page}&sort=updated`;

    const response = await fetch(url);

    if (response.status === 404) {
      throw new Error(`GitHub username "${username}" was not found.`);
    }

    if (!response.ok) {
      throw new Error(
        `GitHub API failed while fetching repositories (HTTP ${response.status}).`
      );
    }

    const pageRepositories = await response.json();
    repositories.push(...pageRepositories);

    if (pageRepositories.length < perPage) {
      break;
    }

    page += 1;
  }

  return repositories;
}

async function fetchUser(username) {
  const response = await fetch(
    `${API_BASE_URL}/users/${encodeURIComponent(username)}`
  );

  if (response.status === 404) {
    throw new Error(`Owner "${username}" was not found.`);
  }

  if (!response.ok) {
    throw new Error(
      `GitHub API failed while fetching owner details (HTTP ${response.status}).`
    );
  }

  return response.json();
}

async function fetchOwnersForRepositories(repositories) {
  const uniqueOwnerLogins = [
    ...new Set(
      repositories
        .map((repository) => repository.owner?.login)
        .filter(Boolean)
    ),
  ];

  const ownerResults = await Promise.all(
    uniqueOwnerLogins.map(async (login) => {
      const owner = await fetchUser(login);
      return [login.toLowerCase(), owner];
    })
  );

  return new Map(ownerResults);
}

function renderOwner(owner) {
  ownerSection.classList.remove("hidden");

  ownerDetails.innerHTML = `
    <img src="${escapeHtml(owner.avatar_url)}" alt="${escapeHtml(owner.login)} avatar">
    <div>
      <h3>${escapeHtml(owner.name || owner.login)}</h3>
      <p><strong>Username:</strong> @${escapeHtml(owner.login)}</p>
      <p><strong>Public Repositories:</strong> ${owner.public_repos}</p>
      <p><strong>Followers:</strong> ${owner.followers}</p>
      <p><strong>Following:</strong> ${owner.following}</p>
      ${
        owner.bio
          ? `<p><strong>Bio:</strong> ${escapeHtml(owner.bio)}</p>`
          : ""
      }
      <p>
        <a href="${escapeHtml(owner.html_url)}" target="_blank" rel="noopener noreferrer">
          View GitHub Profile
        </a>
      </p>
    </div>
  `;
}

function renderRepositories(repositories, owners) {
  repositoriesSection.classList.remove("hidden");
  repoCountElement.textContent = `${repositories.length} repo${
    repositories.length === 1 ? "" : "s"
  }`;

  if (repositories.length === 0) {
    repositoriesElement.innerHTML =
      '<p class="muted">No public repositories found.</p>';
    return;
  }

  repositoriesElement.innerHTML = repositories
    .map((repository) => {
      const owner = owners.get(repository.owner?.login?.toLowerCase());

      return `
        <article class="repo-card">
          <h3>
            <a href="${escapeHtml(repository.html_url)}"
               target="_blank"
               rel="noopener noreferrer">
              ${escapeHtml(repository.name)}
            </a>
          </h3>

          <p class="repo-description">
            ${escapeHtml(repository.description || "No description provided.")}
          </p>

          <div class="repo-meta">
            <span>Owner: ${escapeHtml(owner?.login || repository.owner?.login || "Unknown")}</span>
            <span>Language: ${escapeHtml(repository.language || "N/A")}</span>
            <span>Stars: ${repository.stargazers_count}</span>
            <span>Forks: ${repository.forks_count}</span>
            <span>Visibility: ${escapeHtml(repository.visibility || "public")}</span>
          </div>
        </article>
      `;
    })
    .join("");
}

function startAutomaticRefresh() {
  if (refreshTimer) {
    clearInterval(refreshTimer);
  }

  refreshTimer = setInterval(async () => {
    if (currentUsername) {
      await refreshData();
    }
  }, REFRESH_INTERVAL);
}

function clearResults() {
  ownerSection.classList.add("hidden");
  repositoriesSection.classList.add("hidden");
  ownerDetails.innerHTML = "";
  repositoriesElement.innerHTML = "";
  repoCountElement.textContent = "";
}

function setLoading(isLoading) {
  trackButton.disabled = isLoading;

  if (isLoading) {
    setStatus(`Fetching data for @${currentUsername}...`, "loading");
  }
}

function setStatus(message, type = "") {
  statusElement.textContent = message;
  statusElement.className = `status ${type}`.trim();
}

function showSuccess(message) {
  setStatus(message, "success");
}

function showError(message) {
  setStatus(message, "error");
  ownerSection.classList.add("hidden");
  repositoriesSection.classList.add("hidden");
}

function handleError(error) {
  console.error(error);

  if (error instanceof TypeError) {
    showError(
      "Network error. Please check your internet connection and try again."
    );
    return;
  }

  showError(error.message || "Something went wrong while fetching GitHub data.");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
