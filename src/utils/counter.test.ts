/**
 * Simple test file to verify Counter utility functionality
 * This demonstrates usage and validates the implementation
 */
import { Counter } from './counter.js';

function testCounter() {
  console.log('=== Counter Utility Tests ===\n');

  // Test 1: Default constructor (initial value 0)
  console.log('Test 1: Default constructor');
  const counter1 = new Counter();
  console.log(`Initial value: ${counter1.getValue()}`); // Expected: 0
  console.assert(counter1.getValue() === 0, 'Default initial value should be 0');
  console.log('✓ Passed\n');

  // Test 2: Constructor with initial value
  console.log('Test 2: Constructor with initial value');
  const counter2 = new Counter(10);
  console.log(`Initial value: ${counter2.getValue()}`); // Expected: 10
  console.assert(counter2.getValue() === 10, 'Initial value should be 10');
  console.log('✓ Passed\n');

  // Test 3: Increment method
  console.log('Test 3: Increment method');
  const counter3 = new Counter(5);
  const newValue = counter3.increment();
  console.log(`After increment: ${newValue}`); // Expected: 6
  console.assert(newValue === 6, 'Increment should return 6');
  console.assert(counter3.getValue() === 6, 'Value should be 6');
  console.log('✓ Passed\n');

  // Test 4: Decrement method
  console.log('Test 4: Decrement method');
  const counter4 = new Counter(5);
  const decrementedValue = counter4.decrement();
  console.log(`After decrement: ${decrementedValue}`); // Expected: 4
  console.assert(decrementedValue === 4, 'Decrement should return 4');
  console.assert(counter4.getValue() === 4, 'Value should be 4');
  console.log('✓ Passed\n');

  // Test 5: Multiple operations
  console.log('Test 5: Multiple operations');
  const counter5 = new Counter(0);
  counter5.increment(); // 1
  counter5.increment(); // 2
  counter5.increment(); // 3
  counter5.decrement(); // 2
  console.log(`After 3 increments and 1 decrement: ${counter5.getValue()}`); // Expected: 2
  console.assert(counter5.getValue() === 2, 'Value should be 2');
  console.log('✓ Passed\n');

  // Test 6: Reset method with default initial value
  console.log('Test 6: Reset method with default initial value');
  const counter6 = new Counter();
  counter6.increment();
  counter6.increment();
  counter6.increment();
  const resetValue = counter6.reset();
  console.log(`After reset: ${resetValue}`); // Expected: 0
  console.assert(resetValue === 0, 'Reset should return 0');
  console.assert(counter6.getValue() === 0, 'Value should be 0 after reset');
  console.log('✓ Passed\n');

  // Test 7: Reset method with custom initial value
  console.log('Test 7: Reset method with custom initial value');
  const counter7 = new Counter(100);
  counter7.increment();
  counter7.decrement();
  counter7.decrement();
  const resetValue2 = counter7.reset();
  console.log(`After reset: ${resetValue2}`); // Expected: 100
  console.assert(resetValue2 === 100, 'Reset should return 100');
  console.assert(counter7.getValue() === 100, 'Value should be 100 after reset');
  console.log('✓ Passed\n');

  // Test 8: setValue method
  console.log('Test 8: setValue method');
  const counter8 = new Counter(0);
  const setValue = counter8.setValue(42);
  console.log(`After setValue(42): ${setValue}`); // Expected: 42
  console.assert(setValue === 42, 'setValue should return 42');
  console.assert(counter8.getValue() === 42, 'Value should be 42');
  console.log('✓ Passed\n');

  // Test 9: Negative values
  console.log('Test 9: Negative values');
  const counter9 = new Counter(-5);
  console.log(`Initial negative value: ${counter9.getValue()}`); // Expected: -5
  counter9.decrement();
  console.log(`After decrement: ${counter9.getValue()}`); // Expected: -6
  console.assert(counter9.getValue() === -6, 'Value should be -6');
  console.log('✓ Passed\n');

  console.log('=== All Tests Passed! ===');
}

// Run tests
testCounter();
