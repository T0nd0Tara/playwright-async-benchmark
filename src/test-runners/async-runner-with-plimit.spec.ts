import { test } from "@playwright/test";
import { getAllTests } from "../all_tests";
import { TestArgs } from "../types";
const pLimit = require('p-limit').default

const tests: TestArgs[] = getAllTests()
const amountOfWorkers: number = parseInt(process.env.WORKER_COUNT ?? '1')
console.log('amountOfWorkers', amountOfWorkers)
const testsPerWorker = tests.reduce((chunks, item, index) => {
  chunks[index % amountOfWorkers].push(item);
  return chunks;
}, Array.from({ length: amountOfWorkers }, () => []) as TestArgs[][]);

const maxConcurrencyPerWorker = 15;
const limit = pLimit(maxConcurrencyPerWorker)


for (let workerInd = 0; workerInd < amountOfWorkers; workerInd++) {
  const relevantTests: TestArgs[] = testsPerWorker[workerInd]
  test(`worker_${workerInd}`, async ({ browser }, testInfo) => {
    const testFuncs = relevantTests.map(singleTest => async () => {
      const page = await browser.newPage()
      await page.goto('/');

      // @ts-expect-error: PW enforces destruction of the first arguement in the test
      await singleTest[2]({ browser, page }, testInfo)
    });

    await Promise.all(testFuncs.map(func => limit(func)))
  })
}



