import { Counter } from '../utils/counter.js';

/**
 * Task configuration for counter operations
 */
export interface CounterTask {
  operation: 'increment' | 'decrement' | 'reset' | 'getValue';
  amount?: number;
  initialValue?: number;
}

/**
 * Result of a counter operation
 */
export interface CounterResult {
  success: boolean;
  value: number;
  operation: string;
  error?: string;
}

/**
 * CounterAgent handles counter-related tasks
 * Provides an agent interface for counter operations
 */
export class CounterAgent {
  private counter: Counter;

  /**
   * Creates a new CounterAgent instance
   * @param initialValue - The initial counter value (default: 0)
   */
  constructor(initialValue: number = 0) {
    this.counter = new Counter(initialValue);
  }

  /**
   * Executes a counter task
   * @param task - The task configuration
   * @returns The result of the operation
   */
  async execute(task: CounterTask): Promise<CounterResult> {
    try {
      let value: number;

      switch (task.operation) {
        case 'increment':
          value = this.counter.increment(task.amount);
          break;
        case 'decrement':
          value = this.counter.decrement(task.amount);
          break;
        case 'reset':
          value = this.counter.reset(task.initialValue);
          break;
        case 'getValue':
          value = this.counter.getValue();
          break;
        default:
          throw new Error(`Unknown operation: ${task.operation}`);
      }

      return {
        success: true,
        value,
        operation: task.operation,
      };
    } catch (error) {
      return {
        success: false,
        value: this.counter.getValue(),
        operation: task.operation,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Gets the current counter value
   * @returns The current counter value
   */
  getCurrentValue(): number {
    return this.counter.getValue();
  }
}
