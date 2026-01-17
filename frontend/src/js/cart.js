import { api } from './api.js';

export function bindCartButtons() {
  document.addEventListener('click', async (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const button = target.closest('[data-add-to-cart]');
    if (!button) return;
    const productId = button.getAttribute('data-id');
    if (!productId) return;
    try {
      await api.addToCart({ productId, quantity: 1 });
      alert('Added to cart');
    } catch (err) {
      alert(err.message);
    }
  });
}

export function bindCheckoutButton() {
  const checkoutButton = document.querySelector('[data-checkout]');
  if (!checkoutButton) return;
  checkoutButton.addEventListener('click', async () => {
    try {
      await api.createOrder({ paymentMethod: 'mock' });
      alert('Order placed!');
      window.location.reload();
    } catch (err) {
      alert(err.message);
    }
  });
}

export async function loadCart() {
  const container = document.querySelector('[data-cart-items]');
  const summary = document.querySelector('[data-cart-summary]');
  if (!container) return;
  container.innerHTML = '<p>Loading cart...</p>';
  if (summary) summary.textContent = '';
  try {
    const cart = await api.getCart();
    const items = cart?.items || [];
    if (!items.length) {
      container.innerHTML = '<p>Your cart is empty.</p>';
      return;
    }
    const total = items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
    container.innerHTML = items.map((item) => `
      <div class="card">
        <div class="badge">${item.quantity} in cart</div>
        <h3>${item.name}</h3>
        <p><strong>$${Number(item.price).toFixed(2)}</strong></p>
        <p>Line total: $${(Number(item.price) * item.quantity).toFixed(2)}</p>
        <div class="cart-actions">
          <button class="secondary" data-cart-action="subtract" data-id="${item.product_id}" data-current="${item.quantity}">-</button>
          <button data-cart-action="add" data-id="${item.product_id}">+</button>
          <button class="secondary" data-cart-action="remove" data-id="${item.product_id}">Remove</button>
        </div>
      </div>
    `).join('');
    if (summary) {
      summary.textContent = `Subtotal: $${total.toFixed(2)}`;
    }
  } catch (err) {
    container.innerHTML = `<p>Unable to load cart. ${err.message}</p>`;
  }
}

export function bindCartItemActions() {
  document.addEventListener('click', async (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const button = target.closest('[data-cart-action]');
    if (!button) return;
    const productId = button.getAttribute('data-id');
    const action = button.getAttribute('data-cart-action');
    if (!productId || !action) return;
    try {
      if (action === 'add') {
        await api.addToCart({ productId, quantity: 1 });
      } else if (action === 'subtract') {
        const current = Number(button.getAttribute('data-current') || 0);
        const next = current - 1;
        if (next <= 0) {
          await api.removeCartItem(productId);
        } else {
          await api.updateCartItem(productId, { quantity: next });
        }
      } else if (action === 'remove') {
        await api.removeCartItem(productId);
      }
      await loadCart();
    } catch (err) {
      alert(err.message);
    }
  });
}
