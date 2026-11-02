import { createContext, useContext, useMemo, useReducer, type Dispatch, type ReactNode } from 'react';
import type { CartItem, Product } from '../types';

type CartAction = { type: 'add'; product: Product } | { type: 'remove'; id: string } | { type: 'clear' };
interface CartState { items: CartItem[] }

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'add': {
      const existing = state.items.find((item) => item.id === action.product.id);
      return { items: existing
        ? state.items.map((item) => item.id === existing.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...state.items, { ...action.product, quantity: 1 }] };
    }
    case 'remove': return { items: state.items.filter((item) => item.id !== action.id) };
    case 'clear': return { items: [] };
  }
}

const CartStateContext = createContext<CartState | null>(null);
const CartDispatchContext = createContext<Dispatch<CartAction> | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });
  return <CartDispatchContext.Provider value={dispatch}>
    <CartStateContext.Provider value={state}>{children}</CartStateContext.Provider>
  </CartDispatchContext.Provider>;
}

export function useContextCart() {
  const value = useContext(CartStateContext);
  if (!value) throw new Error('useContextCart must be used inside CartProvider');
  return value.items;
}

export function useContextCartDispatch() {
  const dispatch = useContext(CartDispatchContext);
  if (!dispatch) throw new Error('useContextCartDispatch must be used inside CartProvider');
  return useMemo(() => ({
    add: (product: Product) => dispatch({ type: 'add', product }),
    remove: (id: string) => dispatch({ type: 'remove', id }),
    clear: () => dispatch({ type: 'clear' }),
  }), [dispatch]);
}
