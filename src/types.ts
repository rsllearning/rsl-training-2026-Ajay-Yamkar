export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  color: 'sand' | 'sage' | 'blue' | 'rose';
  icon: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CheckoutResult {
  id: string;
  items: CartItem[];
  total: number;
  createdAt: string;
}

export type StateModel = 'context' | 'zustand' | 'jotai';
