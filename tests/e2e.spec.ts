import { test, expect } from '@playwright/test';

test('Core E-Commerce Flow', async ({ page }) => {
    // 1. Navigate to Home
    await page.goto('/');
    await expect(page).toHaveTitle(/CleanCanvas/);

    // Verify Hero
    await expect(page.getByText('Redefining Modern Commerce')).toBeVisible();

    // 2. Click Product (Add to Cart directly in this UI)
    const productButton = page.locator('button:has-text("Add")').first();
    await productButton.click();

    // Verify "Adding..." state or success
    await expect(productButton).not.toBeDisabled(); // Should eventually re-enable

    // 3. Open Cart
    const cartButton = page.locator('button:has(.lucide-shopping-cart)');
    await cartButton.click();

    // 4. Verify Cart Drawer Open
    const cartDrawer = page.locator('h2:has-text("Cart")');
    await expect(cartDrawer).toBeVisible();

    // Verify Item in Cart
    await expect(page.getByTestId('cart-drawer')).toBeVisible();
    await expect(page.getByTestId('cart-item-name').filter({ hasText: 'Ceramic Diffuser' })).toBeVisible();

    // 5. Proceed to Checkout
    page.on('dialog', dialog => dialog.accept()); // Handle alert
    await page.getByRole('button', { name: 'Proceed to Checkout' }).click();

    // Verify Cart Closes or Mock Success
    // Since we alert and close, we expect it to close or remain.
    // Verify Cart Closes (Framer Motion removes it from DOM or hides it)
    await expect(page.getByTestId('cart-drawer')).not.toBeVisible();
});
