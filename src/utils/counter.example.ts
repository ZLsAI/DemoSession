/**
 * Example usage of the Counter utility class
 * This file demonstrates how to import and use the Counter in your code
 */
import { Counter } from './counter.js';

// Example 1: Basic usage with default initial value
console.log('--- Example 1: Basic Counter ---');
const basicCounter = new Counter();
console.log(`Initial value: ${basicCounter.getValue()}`); // 0
console.log(`After increment: ${basicCounter.increment()}`); // 1
console.log(`After increment: ${basicCounter.increment()}`); // 2
console.log(`After decrement: ${basicCounter.decrement()}`); // 1
console.log();

// Example 2: Counter with custom initial value
console.log('--- Example 2: Custom Initial Value ---');
const customCounter = new Counter(100);
console.log(`Initial value: ${customCounter.getValue()}`); // 100
console.log(`After increment: ${customCounter.increment()}`); // 101
console.log(`After decrement: ${customCounter.decrement()}`); // 100
console.log();

// Example 3: Using reset functionality
console.log('--- Example 3: Reset Functionality ---');
const resetCounter = new Counter(50);
console.log(`Initial value: ${resetCounter.getValue()}`); // 50
resetCounter.increment();
resetCounter.increment();
resetCounter.increment();
console.log(`After 3 increments: ${resetCounter.getValue()}`); // 53
console.log(`After reset: ${resetCounter.reset()}`); // 50
console.log();

// Example 4: Setting specific values
console.log('--- Example 4: Set Value ---');
const valueCounter = new Counter();
console.log(`Initial value: ${valueCounter.getValue()}`); // 0
console.log(`Set to 42: ${valueCounter.setValue(42)}`); // 42
console.log(`After increment: ${valueCounter.increment()}`); // 43
console.log();

// Example 5: Tracking events (practical use case)
console.log('--- Example 5: Practical Use Case - Event Tracking ---');
const requestCounter = new Counter();
const errorCounter = new Counter();

// Simulate some requests
for (let i = 0; i < 10; i++) {
  requestCounter.increment();
  // Simulate 2 errors
  if (i === 3 || i === 7) {
    errorCounter.increment();
  }
}

console.log(`Total requests: ${requestCounter.getValue()}`); // 10
console.log(`Total errors: ${errorCounter.getValue()}`); // 2
console.log(`Success rate: ${((requestCounter.getValue() - errorCounter.getValue()) / requestCounter.getValue() * 100).toFixed(1)}%`); // 80.0%
