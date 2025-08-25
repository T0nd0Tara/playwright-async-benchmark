import { expect } from '@playwright/test';
import type { TestArgs } from '../types';
import { random_string } from '../utils';

export const tests: TestArgs[] = [
  ["summing up lots of numbers", {}, async ({ page }) => {
    let sum = 0;
    for (let i = 0; i < 1_000_000; i++) {
      sum += Math.floor(Math.sqrt(i));
    }

    expect(sum).toBe(666_166_500)
  }]
]
