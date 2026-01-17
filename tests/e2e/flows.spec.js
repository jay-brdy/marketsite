import { test, expect } from '@playwright/test';

function uniqueEmail() {
  return `user_${Date.now()}@example.com`;
}

test('register -> profile visible', async ({ page }) => {
  await page.goto('/pages/login.html');

  await page.fill('[data-register-form] input[name="displayName"]', 'Test User');
  await page.fill('[data-register-form] input[name="email"]', uniqueEmail());
  await page.fill('[data-register-form] input[name="password"]', 'testpass123');
  await page.click('[data-register-form] button[type="submit"]');

  await expect(page).toHaveURL('http://localhost:5173/pages/orders');
});

test('add item to cart then remove', async ({ page }) => {
  // register
  await page.goto('/pages/login.html');
  await page.fill('[data-register-form] input[name="displayName"]', 'Cart User');
  await page.fill('[data-register-form] input[name="email"]', uniqueEmail());
  await page.fill('[data-register-form] input[name="password"]', 'testpass123');
  await page.click('[data-register-form] button[type="submit"]');

  // go to products and add to cart
  await page.goto('/pages/products.html');
  await page.locator('[data-add-to-cart]').first().click();

  // go to cart and remove
  await page.goto('/pages/cart.html');
  await expect(page.locator('[data-cart-items] .card')).toHaveCount(1);
  await page.locator('[data-cart-action="remove"]').first().click();
  await expect(page.locator('[data-cart-items]')).toContainText('empty');
});

test('checkout creates an order', async ({ page }) => {
  // register
  await page.goto('/pages/login.html');
  await page.fill('[data-register-form] input[name="displayName"]', 'Order User');
  await page.fill('[data-register-form] input[name="email"]', uniqueEmail());
  await page.fill('[data-register-form] input[name="password"]', 'testpass123');
  await page.click('[data-register-form] button[type="submit"]');

  // add item
  await page.goto('/pages/products.html');
  await page.locator('[data-add-to-cart]').first().click();

  // checkout
  await page.goto('/pages/cart.html');
  await page.click('[data-checkout]');

  // orders page should show at least one order
  await page.goto('/pages/orders.html');
  await expect(await page.locator('[data-orders] .card').count()).toBeGreaterThan(0);
});