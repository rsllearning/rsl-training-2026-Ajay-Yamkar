import { create } from 'zustand';
import type { CartItem, CheckoutResult, Product } from '../types';

export type CheckoutStatus = 'idle' | 'submitting' | 'success' | 'error';
interface CartStore {
  items: CartItem[];
  checkoutStatus: CheckoutStatus;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  checkout: () => Promise<CheckoutResult>;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [], checkoutStatus: 'idle',
  addItem: (product) => set((state) => {
    const existing = state.items.find((item) => item.id === product.id);
    return { items: existing
      ? state.items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      : [...state.items, { ...product, quantity: 1 }] };
  }),
  removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
  clearCart: () => set({ items: [], checkoutStatus: 'idle' }),
  checkout: async () => {
    const items = get().items;
    if (!items.length) throw new Error('Your bag is empty.');
    set({ checkoutStatus: 'submitting' });
    try {
      const response = await fetch('/api/orders', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, total: selectCartTotal(items), createdAt: new Date().toISOString() }),
      });
      if (!response.ok) throw new Error('We could not complete your order. Please try again.');
      const order = await response.json() as CheckoutResult;
      set({ checkoutStatus: 'success' });
      return order;
    } catch (error) {
      set({ checkoutStatus: 'error' });
      throw error;
    }
  },
}));

export const selectCartTotal = (items: CartItem[]) => items.reduce((sum, item) => sum + item.price * item.quantity, 0);
export const selectCartCount = (items: CartItem[]) => items.reduce((sum, item) => sum + item.quantity, 0);
