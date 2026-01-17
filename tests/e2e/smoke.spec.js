import { test, expect } from '@playwright/test';

test('products page loads', async ({ page }) => {
  await page.goto('/pages/products.html');
  await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible();
  await expect(page.locator('[data-products] .card')).toHaveCount(20);
});