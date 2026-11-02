import { assign, fromPromise, setup } from 'xstate';
import type { CartItem, CheckoutResult } from '../types';

interface CheckoutContext { items: CartItem[]; error: string | null; order: CheckoutResult | null }
type CheckoutEvent = { type: 'CART_UPDATED'; items: CartItem[] } | { type: 'SUBMIT' } | { type: 'CANCEL' };

const submitOrder = fromPromise<CheckoutResult, { items: CartItem[] }>(({ input, signal }) => fetch('/api/orders', {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    items: input.items,
    total: input.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    createdAt: new Date().toISOString(),
  }),
  signal,
}).then(async (response) => {
  if (!response.ok) throw new Error('The payment could not be processed. Please try again.');
  return await response.json() as CheckoutResult;
}));

export const checkoutMachine = setup({
  types: {
    context: {} as CheckoutContext,
    events: {} as CheckoutEvent,
    input: {} as { items: CartItem[] },
  },
  actors: { submitOrder },
  guards: { hasItems: ({ context }) => context.items.length > 0 },
  actions: {
    syncItems: assign(({ event }) => event.type === 'CART_UPDATED' ? { items: event.items, error: null } : {}),
    clearError: assign({ error: null }),
  },
}).createMachine({
  id: 'checkout',
  initial: 'reviewing',
  context: ({ input }) => ({ items: input.items, error: null, order: null }),
  on: { CART_UPDATED: { actions: 'syncItems' } },
  states: {
    reviewing: { on: { SUBMIT: { guard: 'hasItems', target: 'submitting', actions: 'clearError' } } },
    submitting: {
      invoke: {
        src: 'submitOrder',
        input: ({ context }) => ({ items: context.items }),
        onDone: { target: 'success', actions: assign({ order: ({ event }) => event.output, error: null }) },
        onError: { target: 'reviewing', actions: assign({ error: ({ event }) => event.error instanceof Error ? event.error.message : String(event.error) }) },
      },
      on: { CANCEL: { target: 'reviewing', actions: 'clearError' } },
    },
    success: { on: { SUBMIT: { guard: 'hasItems', target: 'submitting', actions: 'clearError' } } },
  },
});
