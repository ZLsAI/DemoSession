/**
 * Counter utility class with core counter logic
 */

/**
 * A simple counter that maintains a numeric value
 */
export class Counter {
  private value: number;
  private readonly initialValue: number;

  constructor(initialValue: number = 0) {
    this.initialValue = initialValue;
    this.value = initialValue;
  }

  /**
   * Increments the counter by the given amount (default: 1)
   */
  increment(amount: number = 1): number {
    this.value += amount;
    return this.value;
  }

  /**
   * Decrements the counter by the given amount (default: 1)
   */
  decrement(amount: number = 1): number {
    this.value -= amount;
    return this.value;
  }

  /**
   * Returns the current counter value
   */
  getValue(): number {
    return this.value;
  }

  /**
   * Resets the counter to the specified value (default: initialValue)
   */
  reset(value?: number): number {
    this.value = value !== undefined ? value : this.initialValue;
    return this.value;
  }
}
