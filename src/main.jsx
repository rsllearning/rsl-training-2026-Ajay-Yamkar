import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createUser, deleteUser, fetchProducts, fetchUsers } from './api.js';
import './styles.css';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: true } },
});

function Status({ kind = 'info', children }) {
  return <div className={`status status-${kind}`} role={kind === 'error' ? 'alert' : 'status'}>{children}</div>;
}

function Products() {
  const [search, setSearch] = useState('');
  const query = useQuery({
    queryKey: ['products', { search }],
    queryFn: () => fetchProducts(search),
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  return (
    <section className="panel">
      <div className="section-heading">
        <div><p className="eyebrow">EXERCISE 01 · QUERIES</p><h2>Product catalog</h2><p className="muted">Search creates a distinct cache entry for each query key.</p></div>
        <button className="button button-secondary" onClick={() => query.refetch()} disabled={query.isFetching}>
          <span className={query.isFetching ? 'spin' : ''}>↻</span> Refresh products
        </button>
      </div>
      <label className="search-box"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products…" /><kbd>QUERY KEY · {search.trim() ? 'FILTERED' : 'ALL'}</kbd></label>

      {query.isPending && <Status>Loading products…</Status>}
      {query.isError && <Status kind="error">Could not load products. {query.error.message} <button className="text-button" onClick={() => query.refetch()}>Try again</button></Status>}
      {query.isSuccess && <>
        {query.isFetching && <Status>Refreshing in the background — current results remain available.</Status>}
        <div className="result-meta"><span>{query.data.length} products</span><span>stale for 30 sec · cached for 5 min</span></div>
        {query.data.length ? <div className="product-grid">{query.data.map((product) => <article className="product-card" key={product.id}>
          <div className="product-image"><img src={product.thumbnail} alt="" loading="lazy" /></div>
          <div className="product-info"><div className="product-category">{product.category}</div><h3>{product.title}</h3><div className="product-bottom"><strong>${product.price}</strong><span className="rating">★ {product.rating}</span></div></div>
        </article>)}</div> : <div className="empty-state">No products match “{search}”. Try another search.</div>}
      </>}
    </section>
  );
}

function useUsers() {
  return useQuery({ queryKey: ['users'], queryFn: fetchUsers, staleTime: 30 * 1000 });
}

function useCreateUser() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => client.invalidateQueries({ queryKey: ['users'] }),
  });
}

function useDeleteUser() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onMutate: async (id) => {
      await client.cancelQueries({ queryKey: ['users'] });
      const previousUsers = client.getQueryData(['users']);
      client.setQueryData(['users'], (old = []) => old.filter((user) => String(user.id) !== String(id)));
      return { previousUsers };
    },
    onError: (_error, _id, context) => {
      if (context?.previousUsers) client.setQueryData(['users'], context.previousUsers);
    },
    onSettled: () => client.invalidateQueries({ queryKey: ['users'] }),
  });
}

function Users() {
  const client = useQueryClient();
  const query = useUsers();
  const create = useCreateUser();
  const remove = useDeleteUser();
  const [form, setForm] = useState({ name: '', email: '', role: 'Member' });
  const [createdMessage, setCreatedMessage] = useState('');

  function submit(event) {
    event.preventDefault();
    setCreatedMessage('');
    create.mutate(form, {
      onSuccess: (user) => {
        setForm({ name: '', email: '', role: 'Member' });
        setCreatedMessage(`${user.name} was added successfully.`);
      },
    });
  }

  return <section className="panel">
    <div className="section-heading"><div><p className="eyebrow">EXERCISE 02 · MUTATIONS</p><h2>Team directory</h2><p className="muted">Create team members and try optimistic removal with automatic rollback.</p></div><button className="button button-secondary" onClick={() => client.invalidateQueries({ queryKey: ['users'] })}>↻ Sync list</button></div>

    <form className="create-form" onSubmit={submit}>
      <div className="form-title"><div><h3>Add a team member</h3><p className="muted">The list refreshes after the server confirms creation.</p></div></div>
      <div className="form-fields">
        <label>Name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Taylor Morgan" /></label>
        <label>Email<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="taylor@company.com" /></label>
        <label>Role<select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}><option>Member</option><option>Admin</option><option>Editor</option><option>Viewer</option></select></label>
        <button className="button button-primary" type="submit" disabled={create.isPending}>{create.isPending ? 'Creating…' : '＋ Add member'}</button>
      </div>
      {create.isError && <Status kind="error">{create.error.message}</Status>}
      {create.isSuccess && createdMessage && <Status kind="success">{createdMessage}</Status>}
    </form>

    <div className="list-heading"><div><h3>People</h3><span className="count-pill">{query.data?.length ?? 0}</span></div>{query.isFetching && <span className="fetching-label"><i /> Syncing</span>}</div>
    {query.isPending && <Status>Loading team members…</Status>}
    {query.isError && <Status kind="error">Could not load users. {query.error.message} <button className="text-button" onClick={() => query.refetch()}>Retry</button></Status>}
    {query.isSuccess && <div className="user-list">{query.data.map((user, index) => <article className="user-row" key={user.id}>
      <div className={`avatar avatar-${index % 5}`}>{user.image ? <img src={user.image} alt="" /> : (user.name || '?').split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase()}</div>
      <div className="user-details"><strong>{user.name}</strong><span>{user.email}</span></div>
      <span className="role-pill">{user.role || 'Member'}</span>
      <button className="delete-button" title={`Delete ${user.name}`} aria-label={`Delete ${user.name}`} disabled={remove.isPending} onClick={() => remove.mutate(user.id)}>×</button>
    </article>)}</div>}
    {remove.isError && <Status kind="error">{remove.error.message} Your list was restored automatically.</Status>}
    {remove.isSuccess && <Status kind="success">User removed. The list has been synchronized.</Status>}
    <p className="tip">Tip: add <code>?fail=1</code> to the URL, then delete a user to see optimistic rollback.</p>
  </section>;
}

function App() {
  const [page, setPage] = useState('products');
  return <div className="app-shell">
    <header className="topbar"><a className="brand" href="#home" onClick={() => setPage('products')}><span className="brand-mark">Q</span><span>query<span className="brand-light">studio</span></span></a><div className="topbar-right"><span className="connection"><i /> API connected</span><span className="avatar avatar-self">AY</span></div></header>
    <main>
      <section className="hero"><div><div className="hero-tag"><span>◉</span> REACT QUERY PLAYGROUND</div><h1>Server state,<br /><span>made simple.</span></h1><p>Explore caching, refetching, and mutations with a hands-on TanStack Query workspace.</p></div><div className="hero-art"><div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/><div className="art-core">◈</div><span className="art-node node-one">↻</span><span className="art-node node-two">⌕</span><span className="art-node node-three">✓</span></div></section>
      <nav className="tabs"><button className={page === 'products' ? 'tab active' : 'tab'} onClick={() => setPage('products')}><span>▦</span> Products <small>01</small></button><button className={page === 'users' ? 'tab active' : 'tab'} onClick={() => setPage('users')}><span>♙</span> User management <small>02</small></button><div className="tabs-note"><span className="live-dot" /> LIVE WORKSPACE</div></nav>
      {page === 'products' ? <Products /> : <Users />}
      <footer><span>Built with <strong>TanStack Query v5</strong></span><span>Assignment workspace <b>·</b> React</span></footer>
    </main>
    <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
  </div>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><QueryClientProvider client={queryClient}><App /></QueryClientProvider></React.StrictMode>);
