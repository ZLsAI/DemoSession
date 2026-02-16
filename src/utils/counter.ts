/**
 * Counter utility class for tracking numerical values
 * Useful for counting orchestration metrics, event counts, or other numerical tracking needs
 */
export class Counter {
  private count: number;
  private readonly initialValue: number;

  /**
   * Creates a new Counter instance
   * @param initialValue - The initial value for the counter (defaults to 0)
   */
  constructor(initialValue: number = 0) {
    this.initialValue = initialValue;
    this.count = initialValue;
  }

  /**
   * Increments the counter by 1
   * @returns The new counter value after incrementing
   */
  increment(): number {
    this.count++;
    return this.count;
  }

  /**
   * Decrements the counter by 1
   * @returns The new counter value after decrementing
   */
  decrement(): number {
    this.count--;
    return this.count;
  }

  /**
   * Resets the counter to its initial value
   * @returns The counter value after reset
   */
  reset(): number {
    this.count = this.initialValue;
    return this.count;
  }

  /**
   * Gets the current counter value
   * @returns The current counter value
   */
  getValue(): number {
    return this.count;
  }

  /**
   * Sets the counter to a specific value
   * @param value - The value to set the counter to
   * @returns The new counter value
   */
  setValue(value: number): number {
    this.count = value;
    return this.count;
  }
}
