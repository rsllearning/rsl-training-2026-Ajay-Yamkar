import { use } from 'react';
import { preload } from 'react-dom';

function ProductCard({ product, onSelect }) {
  return (
    <button className="product-card" onClick={() => onSelect(product)} aria-label={`View details for ${product.name}`}>
      <div className={`product-image-wrap ${product.accent}`}>
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <img src={product.image} alt={product.name} loading="lazy" />
        <span className="quick-view">Quick view <span>↗</span></span>
      </div>
      <div className="product-info">
        <div className="product-meta"><span>{product.category}</span><span>★ {product.rating}</span></div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-bottom"><strong>₹{product.price.toLocaleString('en-IN')}</strong><span className="add-circle">+</span></div>
      </div>
    </button>
  );
}

export default function ProductList({ productsPromise, onSelect, category }) {
  const products = use(productsPromise);
  const visibleProducts = category === 'All' ? products : products.filter((product) => product.category === category);

  // Preload the first visible product image to prioritise the main collection asset.
  if (visibleProducts[0]) {
    preload(visibleProducts[0].image, { as: 'image', fetchPriority: 'high' });
  }

  return (
    <div className="product-grid">
      {visibleProducts.map((product) => <ProductCard key={product.id} product={product} onSelect={onSelect} />)}
      {visibleProducts.length === 0 && <p className="empty-state">No products in this category yet.</p>}
    </div>
  );
}
