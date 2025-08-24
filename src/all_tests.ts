import { TestArgs } from "./types";
import path from 'path';
import { globSync } from "fs";

export function getAllTests(): TestArgs[] {
  const mult = 5;

  const pathPrefix = path.join(__dirname, 'tests')
  const allTests: TestArgs[] = []

  for (const entry of globSync(`${pathPrefix}/**/*.{ts,js}`)) {
    const { tests }: { tests: TestArgs[] } = require(entry)

    tests.forEach(singleTest => {
      for (let i = 0; i < mult; i++) {
        const testProps: TestArgs = [...singleTest];
        testProps[0] += `_${i}`
        allTests.push(testProps);
      }
    })
  }

  return allTests
}
