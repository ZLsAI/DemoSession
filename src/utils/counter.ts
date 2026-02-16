/**
 * Counter utility class
 * Manages a simple counter with increment, decrement, and reset operations
 */
export class Counter {
  private value: number;

  /**
   * Create a new counter with an optional initial value
   * @param initialValue - Starting value (default: 0)
   */
  constructor(initialValue: number = 0) {
    this.value = initialValue;
  }

  /**
   * Increment the counter by a specified amount
   * @param amount - Amount to increment (default: 1)
   * @returns The new counter value
   */
  increment(amount: number = 1): number {
    this.value += amount;
    return this.value;
  }

  /**
   * Decrement the counter by a specified amount
   * @param amount - Amount to decrement (default: 1)
   * @returns The new counter value
   */
  decrement(amount: number = 1): number {
    this.value -= amount;
    return this.value;
  }

  /**
   * Get the current counter value
   * @returns The current value
   */
  getValue(): number {
    return this.value;
  }

  /**
   * Reset the counter to a specified value
   * @param value - Value to reset to (default: 0)
   * @returns The new counter value
   */
  reset(value: number = 0): number {
    this.value = value;
    return this.value;
  }
}
