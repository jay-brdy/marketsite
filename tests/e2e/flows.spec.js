import { test, expect } from '@playwright/test';

function uniqueEmail() {
  // Add randomness so repeated runs don’t collide on unique email constraints.
  return `user_${Date.now()}_${Math.random().toString(36).slice(2)}@example.com`;
}

test('register -> profile visible', async ({ page }) => {
  // Auto-accept alerts so they don’t block fast runs.
  page.on('dialog', (dialog) => dialog.accept());
  await page.goto('/pages/login.html');

  await page.fill('[data-register-form] input[name="displayName"]', 'Test User');
  await page.fill('[data-register-form] input[name="email"]', uniqueEmail());
  await page.fill('[data-register-form] input[name="password"]', 'testpass123');
  // Wait for the register API before checking navigation.
  await Promise.all([
    page.waitForResponse('**/api/auth/register'),
    page.click('[data-register-form] button[type="submit"]')
  ]);
  // Ensure the post-register redirect finishes before the next navigation.
  await page.waitForURL('http://localhost:5173/pages/orders');

  await expect(page).toHaveURL('http://localhost:5173/pages/orders');
});

test('add item to cart then remove', async ({ page }) => {
  // Auto-accept alerts so they don’t block fast runs.
  page.on('dialog', (dialog) => dialog.accept());
  // register
  await page.goto('/pages/login.html');
  await page.fill('[data-register-form] input[name="displayName"]', 'Cart User');
  await page.fill('[data-register-form] input[name="email"]', uniqueEmail());
  await page.fill('[data-register-form] input[name="password"]', 'testpass123');
  // Wait for the register API before continuing.
  await Promise.all([
    page.waitForResponse('**/api/auth/register'),
    page.click('[data-register-form] button[type="submit"]')
  ]);
  // Ensure the post-register redirect finishes before the next navigation.
  await page.waitForURL('http://localhost:5173/pages/orders');

  // go to products and add to cart
  await page.goto('/pages/products.html');
  // Wait for add-to-cart API so the cart is actually updated.
  await Promise.all([
    page.waitForResponse('**/api/cart/items'),
    page.locator('[data-add-to-cart]').first().click()
  ]);

  // go to cart and remove
  await page.goto('/pages/cart.html');
  await expect(page.locator('[data-cart-items] .card')).toHaveCount(1);
  // Wait for remove API so the UI has time to refresh.
  await Promise.all([
    page.waitForResponse('**/api/cart/items/*'),
    page.locator('[data-cart-action="remove"]').first().click()
  ]);
  await expect(page.locator('[data-cart-items]')).toContainText('empty');
});

test('checkout creates an order', async ({ page }) => {
  // Auto-accept alerts so they don’t block fast runs.
  page.on('dialog', (dialog) => dialog.accept());
  // register
  await page.goto('/pages/login.html');
  await page.fill('[data-register-form] input[name="displayName"]', 'Order User');
  await page.fill('[data-register-form] input[name="email"]', uniqueEmail());
  await page.fill('[data-register-form] input[name="password"]', 'testpass123');
  // Wait for the register API before continuing.
  await Promise.all([
    page.waitForResponse('**/api/auth/register'),
    page.click('[data-register-form] button[type="submit"]')
  ]);
  // Ensure the post-register redirect finishes before the next navigation.
  await page.waitForURL('http://localhost:5173/pages/orders');

  // add item
  await page.goto('/pages/products.html');
  // Wait for add-to-cart API so checkout has items.
  await Promise.all([
    page.waitForResponse('**/api/cart/items'),
    page.locator('[data-add-to-cart]').first().click()
  ]);

  // checkout
  await page.goto('/pages/cart.html');
  // Wait for orders API to complete before checking orders page.
  await Promise.all([
    page.waitForResponse((response) => response.url().includes('/api/orders') && response.request().method() === 'POST'),
    page.click('[data-checkout]')
  ]);
  // Checkout triggers a cart page reload; wait for it to settle before navigating away.
  await page.waitForLoadState('load');

  // orders page should show at least one order
  await Promise.all([
    page.waitForResponse((response) => response.url().includes('/api/orders') && response.request().method() === 'GET'),
    page.waitForURL('http://localhost:5173/pages/orders'),
    page.click('a[href="/pages/orders.html"]')
  ]);
  await expect.poll(() => page.locator('[data-orders] .card').count()).toBeGreaterThan(0);
});