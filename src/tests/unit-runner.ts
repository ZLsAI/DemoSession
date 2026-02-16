#!/usr/bin/env node
/**
 * Custom unit test runner using tsx for TypeScript support
 * Runs all test files in the unit test directory
 */

import { readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Simple test framework
interface TestResult {
  name: string;
  passed: boolean;
  error?: Error;
  duration: number;
}

interface TestSuite {
  suiteName: string;
  tests: TestResult[];
}

const testSuites: TestSuite[] = [];
let currentSuite: TestSuite | null = null;

// Global test functions
global.describe = (name: string, fn: () => void) => {
  currentSuite = { suiteName: name, tests: [] };
  testSuites.push(currentSuite);
  try {
    fn();
  } finally {
    currentSuite = null;
  }
};

global.it = (name: string, fn: () => void | Promise<void>) => {
  if (!currentSuite) {
    throw new Error('it() called outside of describe() block');
  }

  // Store the test for later execution
  currentSuite.tests.push({
    name,
    passed: false,
    duration: 0,
    testFn: fn,
  } as any);
};

global.expect = (actual: any) => ({
  toBe(expected: any) {
    if (actual !== expected) {
      throw new Error(`Expected ${JSON.stringify(expected)} but got ${JSON.stringify(actual)}`);
    }
  },
  toEqual(expected: any) {
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      throw new Error(`Expected ${JSON.stringify(expected)} but got ${JSON.stringify(actual)}`);
    }
  },
  toBeGreaterThan(expected: number) {
    if (actual <= expected) {
      throw new Error(`Expected ${actual} to be greater than ${expected}`);
    }
  },
  toBeLessThan(expected: number) {
    if (actual >= expected) {
      throw new Error(`Expected ${actual} to be less than ${expected}`);
    }
  },
  toBeInstanceOf(expected: any) {
    if (!(actual instanceof expected)) {
      throw new Error(`Expected instance of ${expected.name} but got ${actual.constructor.name}`);
    }
  },
  toThrow() {
    if (typeof actual !== 'function') {
      throw new Error('Expected a function');
    }
    try {
      actual();
      throw new Error('Expected function to throw but it did not');
    } catch (error) {
      // Expected to throw
    }
  },
});

// Run tests
async function runTests() {
  console.log('\n🧪 Running Unit Tests\n');

  const unitTestDir = join(__dirname, 'unit');
  const testFiles = readdirSync(unitTestDir).filter(
    (file) => file.endsWith('.test.ts') || file.endsWith('.test.js')
  );

  if (testFiles.length === 0) {
    console.log('❌ No test files found');
    process.exit(1);
  }

  for (const testFile of testFiles) {
    const testPath = join(unitTestDir, testFile);
    console.log(`📄 Loading ${testFile}...`);
    try {
      await import(testPath);
    } catch (error) {
      console.error(`❌ Failed to load ${testFile}:`, error);
      process.exit(1);
    }
  }

  // Execute all tests
  for (const suite of testSuites) {
    for (const test of suite.tests as any[]) {
      const startTime = performance.now();
      try {
        await test.testFn();
        const duration = performance.now() - startTime;
        test.passed = true;
        test.duration = duration;
        delete test.testFn;
      } catch (error) {
        const duration = performance.now() - startTime;
        test.passed = false;
        test.error = error as Error;
        test.duration = duration;
        delete test.testFn;
      }
    }
  }

  // Print results
  let totalTests = 0;
  let passedTests = 0;
  let failedTests = 0;

  for (const suite of testSuites) {
    console.log(`\n📦 ${suite.suiteName}`);
    for (const test of suite.tests) {
      totalTests++;
      if (test.passed) {
        passedTests++;
        console.log(`  ✅ ${test.name} (${test.duration.toFixed(2)}ms)`);
      } else {
        failedTests++;
        console.log(`  ❌ ${test.name} (${test.duration.toFixed(2)}ms)`);
        if (test.error) {
          console.log(`     ${test.error.message}`);
          if (test.error.stack) {
            const stackLines = test.error.stack.split('\n').slice(1, 4);
            stackLines.forEach((line) => console.log(`     ${line.trim()}`));
          }
        }
      }
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log(`📊 Test Summary`);
  console.log(`   Total: ${totalTests}`);
  console.log(`   ✅ Passed: ${passedTests}`);
  console.log(`   ❌ Failed: ${failedTests}`);
  console.log('='.repeat(60) + '\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

// Type declarations for global test functions
declare global {
  var describe: (name: string, fn: () => void) => void;
  var it: (name: string, fn: () => void | Promise<void>) => void;
  var expect: (actual: any) => {
    toBe(expected: any): void;
    toEqual(expected: any): void;
    toBeGreaterThan(expected: number): void;
    toBeLessThan(expected: number): void;
    toBeInstanceOf(expected: any): void;
    toThrow(): void;
  };
}

runTests().catch((error) => {
  console.error('Fatal error running tests:', error);
  process.exit(1);
});
