import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://setsun.xyz');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/setsun.xyz/);
});