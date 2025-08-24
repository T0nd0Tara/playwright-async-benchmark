import { test } from "@playwright/test";
import { getAllTests } from "../all_tests";
import { TestArgs } from "../types";

const tests: TestArgs[] = getAllTests()
const amountOfWorkers: number = parseInt(process.env.WORKER_COUNT ?? '1')
console.log('amountOfWorkers', amountOfWorkers)
const baseSize = Math.floor(tests.length / amountOfWorkers);
const remainder = tests.length % amountOfWorkers;

for (let workerInd = 0; workerInd < amountOfWorkers; workerInd++) {
  const startInd = workerInd * baseSize + Math.min(workerInd, remainder);
  const endInd = startInd + baseSize + (workerInd < remainder ? 1 : 0);
  const relevantTests: TestArgs[] = tests.slice(startInd, endInd)
  test(`worker_${workerInd}`, async ({ browser }, testInfo) => {
    const testPromises = relevantTests.map(async singleTest => {
      const page = await browser.newPage()
      await page.goto('/');

      // @ts-expect-error: PW enforces destruction of the first arguement in the test
      return singleTest[2]({ browser, page }, testInfo)
    });

    await Promise.all(testPromises)
  })
}



