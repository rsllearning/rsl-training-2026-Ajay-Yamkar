import type { Product } from '../types';

export type AddProduct = (product: Product) => void;
const money = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);

export function ProductCard({ product, index, onAdd }: { product: Product; index: number; onAdd?: AddProduct }) {
  return <article className="product-card" style={{ animationDelay: `${index * 70}ms` }}>
    <div className={`product-art ${product.color}`}><span className="art-number">0{index + 1}</span><span className="product-icon" aria-hidden="true">{product.icon}</span><span className="art-decoration" /><span className="swatch-label">sundaygoods / essential</span></div>
    <div className="product-meta"><span className="eyebrow">{product.category}</span><span className="price">{money(product.price)}</span></div>
    <h3>{product.name}</h3><p>{product.description}</p><button className="add-button" disabled={!onAdd} onClick={() => onAdd?.(product)}>Add to bag <span>+</span></button>
  </article>;
}
