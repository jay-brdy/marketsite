const API_BASE = window.API_BASE || 'http://localhost:4000/api';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...options
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || 'Request failed');
  }
  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  getProducts: () => request('/products'),
  getFaqs: () => request('/faqs'),
  register: (payload) => request('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload) => request('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  logout: () => request('/auth/logout', { method: 'POST' }),
  me: () => request('/auth/me'),
  updateProfile: (payload) => request('/auth/me', { method: 'PATCH', body: JSON.stringify(payload) }),
  getCart: () => request('/cart'),
  addToCart: (payload) => request('/cart/items', { method: 'POST', body: JSON.stringify(payload) }),
  updateCartItem: (productId, payload) => request(`/cart/items/${productId}`, { method: 'PATCH', body: JSON.stringify(payload) }),
  removeCartItem: (productId) => request(`/cart/items/${productId}`, { method: 'DELETE' }),
  createOrder: (payload) => request('/orders', { method: 'POST', body: JSON.stringify(payload) }),
  getOrders: () => request('/orders'),
  getAdminOrders: () => request('/admin/orders')
};
