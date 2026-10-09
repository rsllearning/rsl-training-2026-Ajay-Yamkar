# GitHub Repository Tracker

A simple asynchronous JavaScript application that tracks a GitHub user's public repositories and owner profile details.

## Assignment coverage

### Part 1 – Fetch Public Repositories
- Accepts a GitHub username.
- Uses the GitHub REST API.
- Fetches all repository pages using `per_page=100`.
- Displays repository name, description, language, stars, forks, visibility and owner.

### Part 2 – Fetch Owner Details
- Uses the GitHub Users API.
- Fetches owner information asynchronously with `Promise.all`.
- Displays avatar, name, username, repository count, followers, following and bio.

### Part 3 – Refresh Data Automatically
- Uses `setInterval()`.
- Refreshes the currently tracked username every 60 seconds.
- Clears the previous interval before creating a new one.

### Part 4 – Error Handling
Handles:
- Empty username.
- Invalid GitHub username / HTTP 404.
- Network failures.
- Other GitHub API failures.
- Users with zero public repositories.

### Part 5 – Async/Await
- Main asynchronous flow uses `async/await`.
- API errors are handled with `try/catch/finally`.

## How to run

No build tool or npm installation is required.

1. Download/clone the project.
2. Open `index.html` in a browser.
3. Enter a GitHub username such as `octocat`.
4. Click **Track**.
5. The application refreshes automatically every 60 seconds.

For a more production-like local setup, serve the directory using any static HTTP server.

## API endpoints used

Repositories:

`GET https://api.github.com/users/{username}/repos`

User:

`GET https://api.github.com/users/{username}`

## Important implementation decisions

### Pagination
The GitHub repositories endpoint is paginated. Therefore, the application continues requesting pages until a page contains fewer than 100 repositories. This ensures the application attempts to fetch all public repositories rather than only the first API page.

### Owner requests
Repositories contain owner information. Unique owner logins are collected and requested concurrently with `Promise.all`. This demonstrates asynchronous execution while avoiding duplicate owner requests.

### Refresh
The interval is created only after a username has been successfully tracked. A previous interval is cleared before a new one is created, preventing multiple refresh timers from running simultaneously.

## Limitations
The GitHub API has unauthenticated rate limits. If the application makes too many requests, GitHub may return a rate-limit error. A GitHub token could be introduced later for a production version.
