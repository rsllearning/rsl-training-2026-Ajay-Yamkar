import { useOptimistic, useRef, useState, useTransition } from 'react';

// React 19 allows ref to be received as a normal prop; forwardRef is not needed.
function FocusableSearch({ ref, value, onChange, onSubmit }) {
  return (
    <form className="detail-search" onSubmit={onSubmit}>
      <input ref={ref} value={value} onChange={onChange} placeholder="Search the collection…" aria-label="Search the collection" />
      <button className="button button-outline" type="submit">Search</button>
    </form>
  );
}

export default function ProductDetails({ product, onClose, cartCount, setCartCount, notify }) {
  const [optimisticCartCount, addOptimistic] = useOptimistic(cartCount, (count, amount) => count + amount);
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState('');
  const searchRef = useRef(null);

  // React 19 callback ref cleanup: observer is detached when the node unmounts
  // or the callback ref is replaced.
  const observeDetails = (node) => {
    if (!node) return;
    const observer = new ResizeObserver(() => {
      node.dataset.observed = 'true';
    });
    observer.observe(node);
    return () => observer.disconnect();
  };

  function handleAddToCart() {
    startTransition(async () => {
      addOptimistic(1);
      try {
        await new Promise((resolve, reject) => {
          window.setTimeout(() => {
            // A predictable demo failure lets reviewers verify rollback behavior.
            if (product.id === 4) reject(new Error('The Desk Lamp is temporarily unavailable. Please try another item.'));
            else resolve();
          }, 1100);
        });
        setCartCount((count) => count + 1);
        notify(`${product.name} added to your cart.`, 'success');
      } catch (error) {
        notify(error.message, 'error');
      }
    });
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    notify(search.trim() ? `Search ready for “${search.trim()}”.` : 'Enter a product name to search.', 'info');
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="detail-modal" role="dialog" aria-modal="true" aria-labelledby="detail-title" ref={observeDetails}>
        <button className="modal-close" onClick={onClose} aria-label="Close product details">×</button>
        <div className={`detail-image ${product.accent}`}><img src={product.image} alt={product.name} /></div>
        <div className="detail-content">
          <span className="eyebrow">{product.category} · ★ {product.rating}</span>
          <h2 id="detail-title">{product.name}</h2>
          <div className="detail-price">₹{product.price.toLocaleString('en-IN')}</div>
          <p className="detail-description">{product.description} Thoughtfully selected for everyday use, with a focus on useful details and lasting design.</p>
          <div className="detail-benefits"><span>✓ Considered design</span><span>✓ Easy everyday use</span><span>✓ 30-day returns</span></div>
          <div className="cart-preview"><span>Cart quantity</span><strong>{optimisticCartCount}</strong></div>
          <button className="button button-dark full-width" onClick={handleAddToCart} disabled={isPending}>
            {isPending ? <><span className="spinner small-spinner" /> Adding to cart… ({optimisticCartCount})</> : 'Add to cart — ₹' + product.price.toLocaleString('en-IN')}
          </button>
          <p className="micro-copy">Demo behavior: Desk Lamp Mini intentionally simulates an API failure to show rollback.</p>
          <div className="detail-extra">
            <p className="eyebrow">KEEP EXPLORING</p>
            <FocusableSearch ref={searchRef} value={search} onChange={(event) => setSearch(event.target.value)} onSubmit={handleSearchSubmit} />
            <button className="text-button" onClick={() => searchRef.current?.focus()}>Focus search input ↗</button>
          </div>
        </div>
      </section>
    </div>
  );
}
