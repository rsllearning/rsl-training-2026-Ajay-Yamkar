// Simulates a remote API. The stable promise is created once so use() can
// suspend while the product data is being resolved.
export const productsPromise = new Promise((resolve) => {
  window.setTimeout(() => {
    resolve([
      {
        id: 1,
        name: 'Studio Headphones',
        category: 'Electronics',
        price: 2999,
        rating: '4.9',
        badge: 'BESTSELLER',
        description: 'Immersive sound, soft ear cushions, and reliable battery life for commutes and workdays.',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85',
        accent: 'peach'
      },
      {
        id: 2,
        name: 'Everyday Backpack',
        category: 'Bags',
        price: 1899,
        rating: '4.8',
        badge: 'POPULAR',
        description: 'A lightweight everyday bag with practical pockets for college, office, and weekend trips.',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85',
        accent: 'blue'
      },
      {
        id: 3,
        name: 'Copper Coffee Brewer',
        category: 'Home & Kitchen',
        price: 1299,
        rating: '4.7',
        badge: 'NEW',
        description: 'A thoughtfully designed pour-over brewer for slow mornings and fresh filter coffee.',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85',
        accent: 'green'
      },
      {
        id: 4,
        name: 'Desk Lamp Mini',
        category: 'Home & Living',
        price: 1599,
        rating: '4.8',
        badge: '',
        description: 'Warm, adjustable light for focused study sessions, work calls, and cosy evenings.',
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85',
        accent: 'lavender'
      },
      {
        id: 5,
        name: 'Steel Water Bottle',
        category: 'Lifestyle',
        price: 499,
        rating: '4.6',
        badge: 'ECO PICK',
        description: 'A reusable insulated bottle for your daily commute, gym session, or day out.',
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=85',
        accent: 'green'
      },
      {
        id: 6,
        name: 'Wireless Speaker',
        category: 'Electronics',
        price: 2199,
        rating: '4.9',
        badge: '',
        description: 'Portable, room-filling sound for your playlist at home or on a weekend getaway.',
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=85',
        accent: 'blue'
      }
    ]);
  }, 1100);
});
