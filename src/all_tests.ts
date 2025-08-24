import { TestArgs } from "./types";
import path from 'path';
import { globSync } from "fs";

export function getAllTests(): TestArgs[] {
  const pathPrefix = path.join(__dirname, 'tests')
  const allTests: TestArgs[][] = []

  for (const entry of globSync(`${pathPrefix}/**/*.{ts,js}`)) {
    const { tests }: { tests: TestArgs[] } = require(entry)
    allTests.push(tests);
  }
  return allTests.flat()
}
