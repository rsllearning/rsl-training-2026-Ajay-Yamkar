const API = 'https://dummyjson.com';
const STORAGE_KEY = 'query-studio-users-v1';

async function getJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Request failed (${response.status})`);
  return response.json();
}

export async function fetchProducts(search) {
  const path = search.trim()
    ? `/products/search?q=${encodeURIComponent(search.trim())}`
    : '/products?limit=24';
  const result = await getJson(`${API}${path}`);
  return result.products;
}

function readUserStore() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
  } catch {
    return null;
  }
}

function writeUserStore(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export async function fetchUsers() {
  const saved = readUserStore();
  if (saved) return saved;
  const result = await getJson(`${API}/users?limit=12`);
  const users = result.users.map((user) => ({ ...user, role: user.role || 'Member' }));
  writeUserStore(users);
  return users;
}

export async function createUser(input) {
  const response = await fetch(`${API}/users/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new Error(`Could not create user (${response.status})`);
  const created = await response.json();
  const users = readUserStore() || [];
  const user = { ...created, ...input, id: `local-${Date.now()}`, role: input.role };
  writeUserStore([user, ...users]);
  return user;
}

export async function deleteUser(id) {
  if (new URLSearchParams(window.location.search).has('fail')) {
    throw new Error('Demo failure enabled. Remove ?fail=1 from the URL to retry.');
  }
  if (!String(id).startsWith('local-')) {
    const response = await fetch(`${API}/users/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error(`Could not delete user (${response.status})`);
  }
  writeUserStore((readUserStore() || []).filter((user) => String(user.id) !== String(id)));
}
