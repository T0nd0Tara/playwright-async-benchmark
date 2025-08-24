import { test } from "@playwright/test";
import { getAllTests } from "../all_tests";


const tests = getAllTests()

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})
tests.forEach(singleTest => test(...singleTest))


