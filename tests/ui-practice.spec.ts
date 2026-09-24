import { test, expect, type Page } from '@playwright/test';

class UiPracticeFlow {
  constructor(private readonly page: Page) {}

  async openPracticePage() {
    await this.page.goto('https://qaplayground.com/practice');
    await this.page.getByRole('link', { name: /UI Practice/i }).click();
  }

  async openIframesSection() {
    await this.page.getByRole('link', { name: /^Iframes$/i }).click();
  }

  async goBackToUiPractice() {
    await this.page.getByRole('link', { name: /Back to UI Practice/i }).click();
  }

  async verifyUiPracticeHeader() {
    await expect(
      this.page.getByRole('heading', { name: /^UI Practice$/i, level: 1 })
    ).toBeVisible();
  }
}

test.describe('UI Practice navigation flow', () => {
  let uiPracticeFlow: UiPracticeFlow;

  test.beforeEach(async ({ page }) => {
    uiPracticeFlow = new UiPracticeFlow(page);
    await page.goto('https://qaplayground.com/practice');
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('navigates from practice page to Iframes and back to UI Practice', async () => {
    await uiPracticeFlow.openPracticePage();
    await uiPracticeFlow.openIframesSection();
    await uiPracticeFlow.goBackToUiPractice();
    await uiPracticeFlow.verifyUiPracticeHeader();
  });
  
});
