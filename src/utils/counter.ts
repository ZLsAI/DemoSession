/**
 * Counter utility class for managing a numeric counter.
 * Supports increment, decrement, reset, and value management operations.
 */
export class Counter {
  private currentValue: number;
  private readonly initialValue: number;

  /**
   * Creates a new Counter instance.
   * @param initialValue - The initial value for the counter (defaults to 0)
   */
  constructor(initialValue: number = 0) {
    this.initialValue = initialValue;
    this.currentValue = initialValue;
  }

  /**
   * Increments the counter by the specified amount.
   * @param amount - The amount to increment by (defaults to 1)
   * @returns The Counter instance for method chaining
   */
  increment(amount: number = 1): Counter {
    this.currentValue += amount;
    return this;
  }

  /**
   * Decrements the counter by the specified amount.
   * @param amount - The amount to decrement by (defaults to 1)
   * @returns The Counter instance for method chaining
   */
  decrement(amount: number = 1): Counter {
    this.currentValue -= amount;
    return this;
  }

  /**
   * Resets the counter to its initial value.
   * @returns The Counter instance for method chaining
   */
  reset(): Counter {
    this.currentValue = this.initialValue;
    return this;
  }

  /**
   * Gets the current value of the counter.
   * @returns The current counter value
   */
  getValue(): number {
    return this.currentValue;
  }

  /**
   * Sets the counter to a specific value.
   * @param value - The new value for the counter
   * @returns The Counter instance for method chaining
   */
  setValue(value: number): Counter {
    this.currentValue = value;
    return this;
  }
}
