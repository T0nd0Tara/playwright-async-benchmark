import { expect } from '@playwright/test';
import type { TestArgs } from '../types';
import { random_string } from '../utils';

export const tests: TestArgs[] = [
  ["button message before click", {}, async ({ page }) => {
    const button = page.getByTestId('button');
    await expect(button).toHaveText('Click me');

  }],
  ["button message after click", {}, async ({ page }) => {
    const button = page.getByTestId('button')
    await button.click();
    await expect(button).toHaveText('OK');
  }],
  ["button message during click", {}, async ({ page }) => {
    const button = page.getByTestId('button')
    await button.click();
    await expect(button).toHaveText('Loading...');
  }],
  ["button message on error", {}, async ({ page }) => {
    await page.route('**/computation', async route => {
      await route.fulfill({
        body: "<html>Not json</html>"
      });
    });

    const button = page.getByTestId('button')
    await button.click();
    await expect(button).toHaveText('Error!');
  }],
  ["button message on any value", {}, async ({ page }) => {
    const msg = random_string({});
    await page.route('**/computation', async route => {
      await route.fulfill({
        json: {
          msg
        }
      });
    });

    const button = page.getByTestId('button')
    await button.click();
    await expect(button).toHaveText(msg);
  }],
  ["button message after multiple clicks", {}, async ({ page }) => {
    const button = page.getByTestId('button')
    for (let i = 0; i < 3; i++) {
      await button.click();
      await expect(button).toHaveText('Loading...');
      await expect(button).toHaveText('OK');
    }
  }],
]
