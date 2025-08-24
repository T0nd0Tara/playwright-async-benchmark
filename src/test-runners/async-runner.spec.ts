import { test } from "@playwright/test";
import { getAllTests } from "../all_tests";
import { TestArgs } from "../types";

const tests: TestArgs[] = getAllTests()
const amountOfWorkers: number = parseInt(process.env.WORKER_COUNT ?? '1')
console.log('amountOfWorkers', amountOfWorkers)
const testsPerWorker = tests.reduce((chunks, item, index) => {
  chunks[index % amountOfWorkers].push(item);
  return chunks;
}, Array.from({ length: amountOfWorkers }, () => []) as TestArgs[][]);

for (let workerInd = 0; workerInd < amountOfWorkers; workerInd++) {
  const relevantTests: TestArgs[] = testsPerWorker[workerInd]
  test(`worker_${workerInd}`, async ({ browser, ...otherArgs }, testInfo) => {
    const testPromises = relevantTests.map(async singleTest => {
      const page = await browser.newPage()
      await page.goto('/');

      return singleTest[2]({ browser, ...otherArgs, page }, testInfo)
    });

    await Promise.all(testPromises)
  })
}



