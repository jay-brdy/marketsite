import { api } from './api.js';

export function setNavUser(user) {
  const status = document.querySelector('[data-auth-status]');
  if (status) {
    if (user) {
      status.textContent = `Signed in as ${user.displayName} (${user.role})`;
    } else {
      status.textContent = 'Not signed in';
    }
  }

  const authOnly = document.querySelectorAll('[data-auth-only]');
  const guestOnly = document.querySelectorAll('[data-guest-only]');
  authOnly.forEach((el) => {
    el.style.display = user ? '' : 'none';
  });
  guestOnly.forEach((el) => {
    el.style.display = user ? 'none' : '';
  });
}

export async function loadProducts() {
  const container = document.querySelector('[data-products]');
  if (!container) return;
  try {
    const products = await api.getProducts();
    if (!products.length) {
      container.innerHTML = '<p>No products available yet.</p>';
      return;
    }
    container.innerHTML = products.map((product) => {
      const sourceLink = product.source_url ? `<a href="${product.source_url}" target="_blank">Source</a>` : 'Source TBD';
      const imageMarkup = product.image_url ? `<img class="card-image" src="${product.image_url}" alt="${product.name}" loading="lazy" />` : '';
      return `
        <div class="card">
          ${imageMarkup}
          <div class="badge">${product.size}</div>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <p><strong>$${Number(product.price).toFixed(2)}</strong></p>
          <p>Inventory: ${product.inventory}</p>
          <button data-add-to-cart data-id="${product.id}">Add to cart</button>
          <p class="footer">Attribution: ${product.source_attribution || 'N/A'} | ${sourceLink} | ${product.license || 'License TBD'}</p>
        </div>
      `;
    }).join('');
  } catch (err) {
    container.innerHTML = `<p>Unable to load products. ${err.message}</p>`;
  }
}

export async function loadFaqs() {
  const container = document.querySelector('[data-faqs]');
  if (!container) return;
  try {
    const faqs = await api.getFaqs();
    if (!faqs.length) {
      container.innerHTML = '<p>No FAQs available yet.</p>';
      return;
    }
    container.innerHTML = faqs.map((faq) => `
      <div class="card">
        <h3>${faq.question}</h3>
        <p>${faq.answer}</p>
      </div>
    `).join('');
  } catch (err) {
    container.innerHTML = `<p>Unable to load FAQs. ${err.message}</p>`;
  }
}

export async function loadOrders() {
  const container = document.querySelector('[data-orders]');
  if (!container) return;
  try {
    const orders = await api.getOrders();
    if (!orders.length) {
      container.innerHTML = '<p>No orders yet.</p>';
      return;
    }
    container.innerHTML = orders.map((order) => `
      <div class="card">
        <h3>Order #${order.id}</h3>
        <p>Status: ${order.status} (${order.payment_status})</p>
        <p>Total: $${Number(order.total).toFixed(2)}</p>
        <p>${new Date(order.created_at).toLocaleString()}</p>
      </div>
    `).join('');
  } catch (err) {
    container.innerHTML = `<p>Unable to load orders. ${err.message}</p>`;
  }
}

export async function loadAdminOrders() {
  const container = document.querySelector('[data-admin-orders]');
  if (!container) return;
  try {
    const orders = await api.getAdminOrders();
    if (!orders.length) {
      container.innerHTML = '<p>No orders yet.</p>';
      return;
    }
    container.innerHTML = orders.map((order) => `
      <div class="card">
        <h3>Order #${order.id}</h3>
        <p>User ID: ${order.user_id}</p>
        <p>Status: ${order.status} (${order.payment_status})</p>
        <p>Total: $${Number(order.total).toFixed(2)}</p>
        <p>${new Date(order.created_at).toLocaleString()}</p>
      </div>
    `).join('');
  } catch (err) {
    container.innerHTML = `<p>Unable to load admin orders. ${err.message}</p>`;
  }
}
