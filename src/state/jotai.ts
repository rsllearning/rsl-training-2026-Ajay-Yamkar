import { atom } from 'jotai';
import type { CartItem, Product } from '../types';

export const cartItemsAtom = atom<CartItem[]>([]);
export const cartCountAtom = atom((get) => get(cartItemsAtom).reduce((count, item) => count + item.quantity, 0));
export const cartTotalAtom = atom((get) => get(cartItemsAtom).reduce((total, item) => total + item.price * item.quantity, 0));

export const addProductAtom = atom(null, (get, set, product: Product) => {
  const items = get(cartItemsAtom);
  const existing = items.find((item) => item.id === product.id);
  set(cartItemsAtom, existing
    ? items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
    : [...items, { ...product, quantity: 1 }]);
});

export const removeProductAtom = atom(null, (get, set, id: string) => {
  set(cartItemsAtom, get(cartItemsAtom).filter((item) => item.id !== id));
});

export const clearCartAtom = atom(null, (_get, set) => set(cartItemsAtom, []));
