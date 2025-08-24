import { expect } from '@playwright/test';
import type { TestArgs } from '../types';

export const tests: TestArgs[] = [
  ["page has correct title", {}, async ({ page }) => {
    await expect(page).toHaveTitle('PlayWright Async Benchmark');
  }],
  ["page has correct url", {}, async ({ page }) => {
    await expect(page).toHaveURL('http://localhost:3000');
  }]
]

