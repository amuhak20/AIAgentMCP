import { test, expect } from '@playwright/test';

test.describe('UI Practice navigation', () => {
  test('shows the UI Practice card on the Practice page', async ({ page }) => {
    await page.goto('https://qaplayground.com/practice');

    const uiPracticeCard = page.getByRole('link', { name: /UI Practice Beginner/ });

    await expect(uiPracticeCard).toBeVisible();
    await expect(uiPracticeCard).toHaveAttribute('href', '/ui-practice');
  });
});
