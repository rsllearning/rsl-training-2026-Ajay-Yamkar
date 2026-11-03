import { useMemo, useState } from 'react'
import { ArrowDownUp, ArrowRight, Bell, Check, ChevronDown, CircleHelp, Grid2X2, Leaf, Menu, MoreHorizontal, Plus, Search, SlidersHorizontal, Sparkles, X } from 'lucide-react'

type Product = { id: number; name: string; category: string; price: number; stock: number; status: 'In stock' | 'Low stock' | 'Out of stock'; image: string; tone: string }

const initialProducts: Product[] = [
  { id: 1, name: 'Ripple ceramic vase', category: 'Home decor', price: 48, stock: 24, status: 'In stock', image: 'photo-1578500494198-246f612d3b3d', tone: 'from-[#eee8de] to-[#ddd0bf]' },
  { id: 2, name: 'Everyday linen tote', category: 'Accessories', price: 32, stock: 8, status: 'Low stock', image: 'photo-1590874103328-eac38a683ce7', tone: 'from-[#eadfcf] to-[#d6c5ae]' },
  { id: 3, name: 'Sunday coffee set', category: 'Kitchen', price: 64, stock: 31, status: 'In stock', image: 'photo-1514228742587-6b1558fcca3d', tone: 'from-[#e8e7dc] to-[#c7cbb7]' },
  { id: 4, name: 'Soft form candle', category: 'Home fragrance', price: 26, stock: 0, status: 'Out of stock', image: 'photo-1603006905003-be475563bc59', tone: 'from-[#f0e3d7] to-[#ddc8b6]' },
  { id: 5, name: 'Arc oak wall hook', category: 'Furniture', price: 38, stock: 16, status: 'In stock', image: 'photo-1616486338812-3dadae4b4ace', tone: 'from-[#e7e2d8] to-[#c9bca8]' },
  { id: 6, name: 'Wildflower journal', category: 'Stationery', price: 22, stock: 5, status: 'Low stock', image: 'photo-1544816155-12df9643f363', tone: 'from-[#e6e9e0] to-[#cbd2c6]' },
]

const navItems = [
  { label: 'Overview', icon: Grid2X2 }, { label: 'Products', icon: Leaf, active: true },
]

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return <>
    {open && <button aria-label="Close navigation" onClick={onClose} className="fixed inset-0 z-30 bg-ink-950/30 md:hidden" />}
    <aside className={`fixed inset-y-0 left-0 z-40 flex w-[248px] flex-col border-r border-line bg-white px-5 py-6 transition-transform md:static md:z-auto md:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="mb-11 flex items-center justify-between px-1">
        <a href="#top" className="flex items-center gap-2.5" aria-label="Form and Field home"><span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-white"><Leaf size={18} /></span><span className="font-semibold tracking-tight text-ink-950">form & field<span className="ml-1 text-brand-600">.</span></span></a>
        <button aria-label="Close navigation" onClick={onClose} className="rounded-lg p-2 text-ink-600 hover:bg-canvas md:hidden"><X size={18} /></button>
      </div>
      <div className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[.16em] text-ink-400">Workspace</div>
      <div className="mb-8 flex items-center gap-3 rounded-xl border border-line p-3">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-[#f1e9df] text-xs font-bold text-[#8b6748]">S</div><div className="min-w-0 flex-1"><div className="truncate text-sm font-semibold">Studio North</div><div className="text-xs text-ink-600">Free plan</div></div><ChevronDown size={15} className="text-ink-400" />
      </div>
      <div className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[.16em] text-ink-400">Manage</div>
      <nav className="space-y-1" aria-label="Main navigation">{navItems.map(({ label, icon: Icon, active }) => <a key={label} href="#products" aria-current={active ? 'page' : undefined} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${active ? 'bg-brand-50 text-brand-700' : 'text-ink-600 hover:bg-canvas hover:text-ink-950'}`}><Icon size={17} strokeWidth={1.8} />{label}{active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-brand-500" />}</a>)}</nav>
      <div className="mt-auto rounded-2xl bg-[#f4f6f2] p-4"><div className="mb-2 grid h-8 w-8 place-items-center rounded-lg bg-white text-brand-600"><Sparkles size={16} /></div><p className="mb-1 text-sm font-semibold">A little room to grow</p><p className="mb-3 text-xs leading-relaxed text-ink-600">You’re using 6 of 50 product slots on your plan.</p><div className="h-1.5 overflow-hidden rounded-full bg-white"><div className="h-full w-[12%] rounded-full bg-brand-500" /></div><p className="mt-2 text-[11px] text-ink-600">12% of your catalog</p></div>
      <div className="mt-5 flex items-center gap-3 border-t border-line pt-5"><div className="grid h-9 w-9 place-items-center rounded-full bg-[#dcebe2] text-xs font-bold text-brand-700">AY</div><div className="flex-1"><p className="text-sm font-semibold">Ajay Yamkar</p><p className="text-xs text-ink-600">Store owner</p></div><MoreHorizontal size={18} className="text-ink-400" /></div>
    </aside>
  </>
}

function ProductCard({ product, onRestock }: { product: Product; onRestock: (id: number) => void }) {
  const statusStyles = { 'In stock': 'bg-brand-50 text-brand-700', 'Low stock': 'bg-[#fff4e9] text-[#aa6533]', 'Out of stock': 'bg-[#f2f2f0] text-ink-600' }
  const disabled = product.status === 'Out of stock'
  return <article className="group overflow-hidden rounded-card border border-line bg-white shadow-soft transition duration-200 hover:-translate-y-0.5 hover:shadow-lg">
    <div className={`relative aspect-[1.35/1] overflow-hidden bg-gradient-to-br ${product.tone}`}>
      <img src={`https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=800&q=85`} alt={product.name} loading="lazy" className="h-full w-full object-cover mix-blend-multiply transition duration-500 group-hover:scale-[1.04]" />
      <button aria-label={`More actions for ${product.name}`} className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink-800 shadow-sm backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"><MoreHorizontal size={18} /></button>
      <span className={`absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusStyles[product.status]}`}><span className={`h-1.5 w-1.5 rounded-full ${product.status === 'In stock' ? 'bg-brand-500' : product.status === 'Low stock' ? 'bg-[#d58a4d]' : 'bg-ink-400'}`} />{product.status}</span>
    </div>
    <div className="p-4 sm:p-5"><div className="mb-3 flex items-start justify-between gap-3"><div><p className="mb-1 text-xs text-ink-600">{product.category}</p><h2 className="font-semibold leading-snug tracking-[-.02em]">{product.name}</h2></div><span className="whitespace-nowrap pt-0.5 text-sm font-semibold">${product.price.toFixed(2)}</span></div>
      <div className="flex items-center justify-between border-t border-line pt-3"><span className="text-xs text-ink-600">{product.stock} units available</span><button disabled={disabled} onClick={() => onRestock(product.id)} className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-brand-700 transition hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent">Restock <ArrowRight size={13} /></button></div>
    </div>
  </article>
}

function App() {
  const [products, setProducts] = useState(initialProducts)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All products')
  const [menuOpen, setMenuOpen] = useState(false)
  const categories = ['All products', ...new Set(initialProducts.map((product) => product.category))]
  const visibleProducts = useMemo(() => products.filter((product) => (category === 'All products' || product.category === category) && product.name.toLowerCase().includes(query.toLowerCase())), [products, category, query])
  const restock = (id: number) => setProducts((current) => current.map((product) => product.id === id ? { ...product, stock: product.stock + 10, status: 'In stock' } : product))

  return <div id="top" className="min-h-screen md:flex"><Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} /><main className="min-w-0 flex-1">
    <header className="sticky top-0 z-20 flex h-[68px] items-center justify-between border-b border-line bg-white/90 px-4 backdrop-blur sm:px-7 lg:px-10"><div className="flex items-center gap-3"><button aria-label="Open navigation" onClick={() => setMenuOpen(true)} className="grid h-9 w-9 place-items-center rounded-lg text-ink-600 hover:bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 md:hidden"><Menu size={19} /></button><span className="text-sm text-ink-600">Store /</span><span className="text-sm font-semibold">Products</span></div><div className="flex items-center gap-2"><button aria-label="Help" className="hidden h-9 w-9 place-items-center rounded-lg text-ink-600 hover:bg-canvas sm:grid"><CircleHelp size={18} /></button><button aria-label="Notifications" className="relative grid h-9 w-9 place-items-center rounded-lg text-ink-600 hover:bg-canvas"><Bell size={18} /><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-accent" /></button><div className="ml-1 grid h-8 w-8 place-items-center rounded-full bg-[#dcebe2] text-[10px] font-bold text-brand-700 md:hidden">AY</div></div></header>
    <div className="mx-auto max-w-[1440px] px-4 py-7 sm:px-7 sm:py-9 lg:px-10 lg:py-10">
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[.13em] text-brand-600"><span className="h-px w-5 bg-brand-500" />Your catalog</div><h1 className="font-serif text-[2rem] leading-tight tracking-[-.04em] sm:text-[2.6rem]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Products, thoughtfully.</h1><p className="mt-2 text-sm text-ink-600">A little overview of everything in your shop.</p></div><button onClick={() => alert('Your new product draft is ready to fill in.')} className="inline-flex h-11 items-center justify-center gap-2 self-start rounded-xl bg-brand-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 sm:self-auto"><Plus size={17} /> Add product</button></div>
      <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"><div className="rounded-card border border-line bg-white p-4 sm:p-5"><p className="text-xs text-ink-600">Total products</p><p className="mt-2 text-2xl font-semibold tracking-tight">06 <span className="ml-1 text-xs font-medium text-brand-600">+2 this month</span></p></div><div className="rounded-card border border-line bg-white p-4 sm:p-5"><p className="text-xs text-ink-600">Inventory value</p><p className="mt-2 text-2xl font-semibold tracking-tight">$1,248</p></div><div className="rounded-card border border-line bg-white p-4 sm:p-5"><p className="text-xs text-ink-600">Low in stock</p><p className="mt-2 text-2xl font-semibold tracking-tight">02 <span className="ml-1 text-xs font-medium text-[#aa6533]">needs a look</span></p></div><div className="rounded-card border border-line bg-white p-4 sm:p-5"><p className="text-xs text-ink-600">Out of stock</p><p className="mt-2 text-2xl font-semibold tracking-tight">01</p></div></div>
      <section id="products" aria-label="Product catalog"><div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-base font-semibold tracking-tight">Your products <span className="ml-1 text-xs font-medium text-ink-400">{visibleProducts.length}</span></h2></div><div className="flex flex-col gap-2 sm:flex-row"><label className="relative"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products" aria-label="Search products" className="h-10 w-full rounded-xl border border-line bg-white pl-9 pr-3 text-sm outline-none transition placeholder:text-ink-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 sm:w-52" /></label><div className="flex gap-2"><label className="relative flex-1"><SlidersHorizontal size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-600" /><select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filter by category" className="h-10 w-full appearance-none rounded-xl border border-line bg-white pl-9 pr-8 text-sm text-ink-800 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 sm:w-40">{categories.map((item) => <option key={item}>{item}</option>)}</select><ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-400" /></label><button aria-label="Sort products" className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-white text-ink-600 transition hover:bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"><ArrowDownUp size={16} /></button></div></div></div>
        {visibleProducts.length ? <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-5">{visibleProducts.map((product) => <ProductCard key={product.id} product={product} onRestock={restock} />)}</div> : <div className="rounded-card border border-dashed border-line bg-white py-16 text-center"><div className="mx-auto mb-3 grid h-11 w-11 place-items-center rounded-full bg-brand-50 text-brand-600"><Search size={18} /></div><p className="font-semibold">Nothing here just yet</p><p className="mt-1 text-sm text-ink-600">Try another search or category.</p></div>}
      </section>
      <footer className="mt-9 flex flex-col gap-2 border-t border-line pt-5 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between"><span>Showing {visibleProducts.length} of {products.length} products</span><span className="flex items-center gap-1.5"><Check size={13} className="text-brand-500" /> All changes saved</span></footer>
    </div>
  </main></div>
}

export default App
