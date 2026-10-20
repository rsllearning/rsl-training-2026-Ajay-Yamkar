import { Suspense, useState } from 'react';
import { preconnect, prefetchDNS } from 'react-dom';
import { productsPromise } from './data/products.js';
import { UserContext } from './context/UserContext.jsx';
import { ErrorBoundary } from './components/ErrorBoundary.jsx';
import ProductList from './components/ProductList.jsx';
import RegistrationForm from './components/RegistrationForm.jsx';
import UserWelcome from './components/UserWelcome.jsx';
import ProductDetails from './components/ProductDetails.jsx';

const categories = ['All', 'Electronics', 'Bags', 'Home & Kitchen', 'Home & Living', 'Lifestyle'];

function ProductSkeletons() {
  return (
    <div className="product-grid" aria-label="Loading products" role="status">
      {Array.from({ length: 6 }, (_, index) => (
        <div className="skeleton-card" key={index}>
          <div className="skeleton skeleton-image" />
          <div className="skeleton-lines"><div className="skeleton skeleton-line short" /><div className="skeleton skeleton-line" /><div className="skeleton skeleton-line medium" /></div>
        </div>
      ))}
      <span className="sr-only">Loading the collection…</span>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [category, setCategory] = useState('All');
  const [cartCount, setCartCount] = useState(0);
  const [toast, setToast] = useState(null);

  // Asset Loading APIs: preconnect reduces connection setup overhead for the
  // image CDN; prefetchDNS resolves the remote font host ahead of use.
  preconnect('https://images.unsplash.com', { crossOrigin: 'anonymous' });
  prefetchDNS('https://fonts.googleapis.com');

  function notify(message, type = 'info') {
    setToast({ message, type });
    window.setTimeout(() => setToast(null), 3200);
  }

  return (
    <UserContext value={user}>
      <>
        <title>Northstar — Thoughtful everyday essentials</title>
        <meta name="description" content="Discover considered everyday essentials for work, home, and everywhere in between at Northstar." />
        <header className="site-header">
          <a className="brand" href="#top" aria-label="Northstar home"><span className="brand-mark">N</span> northstar<span className="brand-dot">.</span></a>
          <nav className="main-nav"><a href="#shop">Shop</a><a href="#story">Our story</a><a href="#register">Join us</a></nav>
          <div className="header-actions">
            <span className="cart-pill"><span className="cart-icon">▱</span> Cart <b>{cartCount}</b></span>
            <UserWelcome user={user} />
          </div>
        </header>

        <main id="top">
          <section className="hero">
            <div className="hero-copy">
              <span className="eyebrow"><span className="eyebrow-line" /> MADE FOR EVERYDAY INDIA</span>
              <h1>Find your<br /><em>new</em> favourite.</h1>
              <p>Everyday finds for the way India lives, works, and unwinds. Thoughtful design, useful details, and prices that make sense.</p>
              <a className="button button-dark hero-cta" href="#shop">Explore the collection <span>↘</span></a>
              <div className="hero-proof"><div className="proof-avatars"><span>A</span><span>M</span><span>J</span></div><span>Loved by <strong>2,400+</strong> everyday explorers</span></div>
            </div>
            <div className="hero-art">
              <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
              <img src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=1200&q=85" alt="Warm, thoughtfully designed modern living space" />
              <div className="hero-note"><span className="note-star">✳</span><span><strong>Made for real life</strong><small>Good design. Better days.</small></span></div>
              <div className="hero-number">01 <span>/ 06</span></div>
            </div>
            <div className="hero-side-label">OBJECTS WITH INTENTION — EST. 2024</div>
          </section>

          <section className="trust-strip" id="story">
            <span>✳ Thoughtfully selected</span><span>↗ Designed for daily life</span><span>♡ Small details, big difference</span><span>◎ Easy, mindful shopping</span>
          </section>

          <section className="shop-section section-shell" id="shop">
            <div className="section-heading">
              <div><span className="eyebrow">THE NORTHSTAR EDIT</span><h2>Everyday <em>essentials.</em></h2><p>Useful things, beautifully considered.</p></div>
              <a href="#register" className="underlined-link">Meet your new favourites <span>↗</span></a>
            </div>
            <div className="category-row" aria-label="Filter products by category">
              {categories.map((item) => <button key={item} className={`category-chip ${category === item ? 'active' : ''}`} onClick={() => setCategory(item)}>{item}</button>)}
            </div>
            <ErrorBoundary>
              <Suspense fallback={<ProductSkeletons />}>
                <ProductList productsPromise={productsPromise} onSelect={setSelectedProduct} category={category} />
              </Suspense>
            </ErrorBoundary>
            <div className="shop-footnote"><span>Showing considered things for everyday living.</span><span>SCROLL LESS. LOVE MORE. ↗</span></div>
          </section>

          <section className="manifesto">
            <div className="manifesto-mark">N.</div>
            <div><span className="eyebrow">A SMALLER, BETTER WAY</span><h2>Buy less noise.<br /><em>Keep more meaning.</em></h2></div>
            <p>We believe the things you bring into your life should earn their place. That's why every Northstar pick is useful, considered, and made to feel right at home.</p>
          </section>

          <RegistrationForm onRegistered={setUser} />

          <footer className="site-footer"><a className="brand" href="#top"><span className="brand-mark">N</span> northstar<span className="brand-dot">.</span></a><span>Thoughtfully picked. Everyday loved.</span><span>© 2026 Northstar Studio</span></footer>
        </main>

        {selectedProduct && <ProductDetails product={selectedProduct} onClose={() => setSelectedProduct(null)} cartCount={cartCount} setCartCount={setCartCount} notify={notify} />}
        {toast && <div className={`toast toast-${toast.type}`} role="status"><span>{toast.type === 'error' ? '!' : toast.type === 'success' ? '✓' : 'i'}</span>{toast.message}<button onClick={() => setToast(null)} aria-label="Dismiss notification">×</button></div>}
      </>
    </UserContext>
  );
}
