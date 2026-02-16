/**
 * Counter utility class
 * Provides basic counter operations with increment and decrement functionality
 */
export class Counter {
  private value: number;

  /**
   * Creates a new Counter instance
   * @param initialValue - The initial value for the counter (default: 0)
   */
  constructor(initialValue: number = 0) {
    this.value = initialValue;
  }

  /**
   * Gets the current counter value
   * @returns The current counter value
   */
  getValue(): number {
    return this.value;
  }

  /**
   * Increments the counter by a specified amount
   * @param amount - The amount to increment by (default: 1)
   * @returns The new counter value
   */
  increment(amount: number = 1): number {
    if (!Number.isFinite(amount)) {
      throw new Error('Increment amount must be a finite number');
    }
    this.value += amount;
    return this.value;
  }

  /**
   * Decrements the counter by a specified amount
   * @param amount - The amount to decrement by (default: 1)
   * @returns The new counter value
   */
  decrement(amount: number = 1): number {
    if (!Number.isFinite(amount)) {
      throw new Error('Decrement amount must be a finite number');
    }
    this.value -= amount;
    return this.value;
  }

  /**
   * Resets the counter to zero or a specified value
   * @param value - The value to reset to (default: 0)
   * @returns The new counter value
   */
  reset(value: number = 0): number {
    if (!Number.isFinite(value)) {
      throw new Error('Reset value must be a finite number');
    }
    this.value = value;
    return this.value;
  }
}
