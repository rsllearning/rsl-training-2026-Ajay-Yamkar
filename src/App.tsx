import { useEffect, useState } from 'react';
import { ProductCard, type AddProduct } from './components/ShopShell';
import type { Product } from './types';

export function Catalog({ products, onAdd }: { products: Product[]; onAdd?: AddProduct }) {
  return <section className="catalog-column" id="catalog">
    <div className="section-heading"><div><span className="eyebrow">THE EVERYDAY EDIT</span><h2>Desk, <em>reimagined.</em></h2></div><span className="product-count">{products.length.toString().padStart(2, '0')} OBJECTS</span></div>
    <p className="section-intro">A few things that earn their place on your desk — and stay there.</p>
    <div className="product-grid">{products.map((product, index) => <ProductCard key={product.id} product={product} index={index} onAdd={onAdd} />)}</div>
  </section>;
}

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/products', { signal: controller.signal })
      .then((response) => { if (!response.ok) throw new Error('Catalog is unavailable. Start the API server and try again.'); return response.json() as Promise<Product[]>; })
      .then(setProducts)
      .catch((reason: unknown) => { if (!controller.signal.aborted) setError(reason instanceof Error ? reason.message : 'Could not load products.'); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, []);

  return <div className="app-shell">
    <Header />
    <main id="top">
      <Hero />
      <div className="benefits-strip"><span>✳ Carefully considered design</span><span>·</span><span>Free shipping over $100</span><span>·</span><span>Made for the long haul</span></div>
      <section className="shop-layout">
        {loading ? <div className="catalog-message">Setting the scene…</div> : error ? <div className="catalog-message error-text">{error}</div> : <Catalog products={products} />}
        <CartShell />
      </section>
      <Story />
      <Footer />
    </main>
  </div>;
}

function Header() {
  return <header className="topbar"><a className="wordmark" href="#top" aria-label="ShopCart home"><span className="mark">s.</span> sunday<span className="wordmark-light">goods</span></a>
    <div className="topbar-right"><div className="desktop-nav"><a href="#catalog">Shop</a><a href="#story">Our approach</a></div><div className="bag-pill"><span>Bag</span><span className="bag-count">0</span></div></div>
  </header>;
}

function Hero() {
  return <><section className="hero"><div className="hero-copy"><span className="eyebrow"><span className="status-dot" /> OBJECTS FOR A BETTER EVERYDAY</span>
    <h1>Good things.<br /><em>Thoughtfully</em> made.</h1><p>A considered collection of desk essentials, designed to make the everyday feel a little more intentional.</p><a className="text-link" href="#catalog">Explore the collection <span>↓</span></a></div>
    <div className="hero-art" aria-label="A warm, curated workspace illustration"><div className="sun-disc" /><div className="art-plant">✳</div><div className="art-lamp">⌁</div><div className="art-book" /><div className="art-cup">◖</div><span className="art-note">A slower kind<br />of productivity.</span><span className="art-grain" /></div><div className="hero-index"><span>01 — 04</span><span>THE WORKSPACE EDIT</span></div></section></>;
}

function CartShell() {
  return <aside className="cart-column"><div className="cart-card"><div className="cart-heading"><div><span className="eyebrow">YOUR SELECTION</span><h2>Your bag</h2></div><span className="bag-count">0</span></div>
    <div className="empty-cart"><span className="empty-bag">⌑</span><p>Your bag is taking a breather.</p><span>Add something you love.</span></div>
    <div className="total-row"><span>Estimated total</span><strong>$0</strong></div><button className="checkout-button" disabled>Continue to checkout <span>↗</span></button><p className="secure-note"><span>✳</span> Secure checkout · Free shipping over $100</p>
  </div></aside>;
}

function Story() {
  return <section className="story-strip" id="story"><div className="story-symbol">✳</div><div><span className="eyebrow">LESS, BUT BETTER</span><h2>Made to stay.<br /><em>Not just to arrive.</em></h2></div><p>We believe a good workspace isn't built all at once. It's gathered, piece by piece, with things that feel right and work hard.</p></section>;
}
function Footer() { return <footer><a className="wordmark" href="#top"><span className="mark">s.</span> sunday<span className="wordmark-light">goods</span></a><span>Considered things for everyday living.</span><span>© 2025 sundaygoods</span></footer>; }
