/**
 * Comprehensive unit tests for Counter utility
 * Testing all Counter functionality including edge cases
 */

import { Counter } from '../../utils/counter.js';

describe('Counter - Constructor', () => {
  it('should initialize with default value of 0', () => {
    const counter = new Counter();
    expect(counter.getValue()).toBe(0);
  });

  it('should initialize with custom positive value', () => {
    const counter = new Counter(10);
    expect(counter.getValue()).toBe(10);
  });

  it('should initialize with custom negative value', () => {
    const counter = new Counter(-5);
    expect(counter.getValue()).toBe(-5);
  });

  it('should initialize with zero when explicitly passed', () => {
    const counter = new Counter(0);
    expect(counter.getValue()).toBe(0);
  });

  it('should create a Counter instance', () => {
    const counter = new Counter();
    expect(counter).toBeInstanceOf(Counter);
  });
});

describe('Counter - Increment Operation', () => {
  it('should increment by 1 when no amount specified', () => {
    const counter = new Counter(5);
    counter.increment();
    expect(counter.getValue()).toBe(6);
  });

  it('should increment by specified positive amount', () => {
    const counter = new Counter(0);
    counter.increment(5);
    expect(counter.getValue()).toBe(5);
  });

  it('should increment multiple times correctly', () => {
    const counter = new Counter(0);
    counter.increment();
    counter.increment();
    counter.increment();
    expect(counter.getValue()).toBe(3);
  });

  it('should handle increment by large numbers', () => {
    const counter = new Counter(0);
    counter.increment(1000000);
    expect(counter.getValue()).toBe(1000000);
  });

  it('should increment from negative to positive', () => {
    const counter = new Counter(-5);
    counter.increment(10);
    expect(counter.getValue()).toBe(5);
  });

  it('should support method chaining for increment', () => {
    const counter = new Counter(0);
    const result = counter.increment(5).increment(3);
    expect(result).toBeInstanceOf(Counter);
    expect(counter.getValue()).toBe(8);
  });
});

describe('Counter - Decrement Operation', () => {
  it('should decrement by 1 when no amount specified', () => {
    const counter = new Counter(5);
    counter.decrement();
    expect(counter.getValue()).toBe(4);
  });

  it('should decrement by specified positive amount', () => {
    const counter = new Counter(10);
    counter.decrement(5);
    expect(counter.getValue()).toBe(5);
  });

  it('should decrement multiple times correctly', () => {
    const counter = new Counter(10);
    counter.decrement();
    counter.decrement();
    counter.decrement();
    expect(counter.getValue()).toBe(7);
  });

  it('should allow decrement below zero', () => {
    const counter = new Counter(5);
    counter.decrement(10);
    expect(counter.getValue()).toBe(-5);
  });

  it('should handle decrement by large numbers', () => {
    const counter = new Counter(1000000);
    counter.decrement(999999);
    expect(counter.getValue()).toBe(1);
  });

  it('should support method chaining for decrement', () => {
    const counter = new Counter(20);
    const result = counter.decrement(5).decrement(3);
    expect(result).toBeInstanceOf(Counter);
    expect(counter.getValue()).toBe(12);
  });
});

describe('Counter - Reset Functionality', () => {
  it('should reset to default initial value of 0', () => {
    const counter = new Counter();
    counter.increment(10);
    counter.reset();
    expect(counter.getValue()).toBe(0);
  });

  it('should reset to custom initial value', () => {
    const counter = new Counter(100);
    counter.increment(50);
    counter.decrement(25);
    counter.reset();
    expect(counter.getValue()).toBe(100);
  });

  it('should reset to negative initial value', () => {
    const counter = new Counter(-10);
    counter.increment(20);
    counter.reset();
    expect(counter.getValue()).toBe(-10);
  });

  it('should support method chaining for reset', () => {
    const counter = new Counter(5);
    counter.increment(10);
    const result = counter.reset();
    expect(result).toBeInstanceOf(Counter);
    expect(counter.getValue()).toBe(5);
  });
});

describe('Counter - getValue Method', () => {
  it('should return current value after increment', () => {
    const counter = new Counter(0);
    counter.increment(5);
    expect(counter.getValue()).toBe(5);
  });

  it('should return current value after decrement', () => {
    const counter = new Counter(10);
    counter.decrement(3);
    expect(counter.getValue()).toBe(7);
  });

  it('should return zero for default counter', () => {
    const counter = new Counter();
    expect(counter.getValue()).toBe(0);
  });

  it('should return negative value correctly', () => {
    const counter = new Counter(-15);
    expect(counter.getValue()).toBe(-15);
  });
});

describe('Counter - setValue Method', () => {
  it('should set counter to specific value', () => {
    const counter = new Counter(0);
    counter.setValue(42);
    expect(counter.getValue()).toBe(42);
  });

  it('should set counter to negative value', () => {
    const counter = new Counter(10);
    counter.setValue(-5);
    expect(counter.getValue()).toBe(-5);
  });

  it('should set counter to zero', () => {
    const counter = new Counter(100);
    counter.setValue(0);
    expect(counter.getValue()).toBe(0);
  });

  it('should support method chaining for setValue', () => {
    const counter = new Counter(0);
    const result = counter.setValue(10);
    expect(result).toBeInstanceOf(Counter);
    expect(counter.getValue()).toBe(10);
  });

  it('should allow setValue to be called multiple times', () => {
    const counter = new Counter(0);
    counter.setValue(5);
    counter.setValue(10);
    counter.setValue(15);
    expect(counter.getValue()).toBe(15);
  });
});

describe('Counter - Edge Cases', () => {
  it('should handle zero as a value throughout operations', () => {
    const counter = new Counter(0);
    counter.increment(5);
    counter.decrement(5);
    expect(counter.getValue()).toBe(0);
  });

  it('should handle very large positive numbers', () => {
    const counter = new Counter(Number.MAX_SAFE_INTEGER - 10);
    counter.increment(5);
    expect(counter.getValue()).toBe(Number.MAX_SAFE_INTEGER - 5);
  });

  it('should handle very large negative numbers', () => {
    const counter = new Counter(Number.MIN_SAFE_INTEGER + 10);
    counter.decrement(5);
    expect(counter.getValue()).toBe(Number.MIN_SAFE_INTEGER + 5);
  });

  it('should handle mixed operations with negative numbers', () => {
    const counter = new Counter(-10);
    counter.increment(20);
    counter.decrement(5);
    counter.increment(15);
    expect(counter.getValue()).toBe(20);
  });

  it('should handle decimal increment amounts', () => {
    const counter = new Counter(0);
    counter.increment(1.5);
    counter.increment(2.5);
    expect(counter.getValue()).toBe(4);
  });

  it('should handle decimal decrement amounts', () => {
    const counter = new Counter(10);
    counter.decrement(3.5);
    counter.decrement(1.5);
    expect(counter.getValue()).toBe(5);
  });
});

describe('Counter - Method Chaining', () => {
  it('should support chaining increment, decrement, and reset', () => {
    const counter = new Counter(10);
    counter
      .increment(5)
      .decrement(3)
      .increment(2)
      .reset();
    expect(counter.getValue()).toBe(10);
  });

  it('should support chaining setValue with other operations', () => {
    const counter = new Counter(0);
    counter
      .setValue(50)
      .increment(10)
      .decrement(5);
    expect(counter.getValue()).toBe(55);
  });

  it('should support complex operation chains', () => {
    const counter = new Counter(100);
    counter
      .increment(50)
      .decrement(30)
      .increment(10)
      .setValue(200)
      .decrement(50)
      .increment(25);
    expect(counter.getValue()).toBe(175);
  });
});

describe('Counter - Isolation and Independence', () => {
  it('should maintain independent state across multiple instances', () => {
    const counter1 = new Counter(0);
    const counter2 = new Counter(0);
    
    counter1.increment(5);
    counter2.increment(10);
    
    expect(counter1.getValue()).toBe(5);
    expect(counter2.getValue()).toBe(10);
  });

  it('should not affect other instances when resetting', () => {
    const counter1 = new Counter(5);
    const counter2 = new Counter(10);
    
    counter1.increment(10);
    counter2.increment(10);
    
    counter1.reset();
    
    expect(counter1.getValue()).toBe(5);
    expect(counter2.getValue()).toBe(20);
  });

  it('should maintain separate initial values', () => {
    const counter1 = new Counter(100);
    const counter2 = new Counter(-50);
    
    counter1.reset();
    counter2.reset();
    
    expect(counter1.getValue()).toBe(100);
    expect(counter2.getValue()).toBe(-50);
  });
});
