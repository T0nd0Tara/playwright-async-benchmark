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
  test(`worker_${workerInd}`, async ({ browser }, testInfo) => {
    const testPromises = relevantTests.map(async singleTest => {
      const context = await browser.newContext()
      const page = await context.newPage()
      await page.goto('/');

      // @ts-expect-error: PW enforces destruction of the first arguement in the test
      await singleTest[2]({ browser, page }, testInfo)
      await context.close();
    });

    await Promise.all(testPromises)
  })
}



