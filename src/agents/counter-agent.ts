import { BaseAgent, TaskResult } from './base-agent.js';
import { Counter } from '../utils/counter.js';

/**
 * Valid operations for the counter agent
 */
type CounterOperation = 'increment' | 'decrement' | 'getValue' | 'reset';

/**
 * Input for counter agent operations
 */
export interface CounterInput {
  operation: CounterOperation;
  amount?: number;
  value?: number;
}

/**
 * Counter Agent
 * Demonstrates state management in workflow agents
 * Wraps the Counter utility class and provides agent interface
 */
export class CounterAgent extends BaseAgent {
  private counter: Counter;

  constructor() {
    super('CounterAgent');
    this.counter = new Counter();
  }

  /**
   * Validate the input for counter operations
   */
  protected validateInput(input: CounterInput): void {
    if (!input || typeof input !== 'object') {
      throw new Error('Input must be an object');
    }

    const validOperations: CounterOperation[] = ['increment', 'decrement', 'getValue', 'reset'];
    if (!validOperations.includes(input.operation)) {
      throw new Error(`Invalid operation. Must be one of: ${validOperations.join(', ')}`);
    }

    if ((input.operation === 'increment' || input.operation === 'decrement') && 
        input.amount !== undefined && typeof input.amount !== 'number') {
      throw new Error('Amount must be a number');
    }

    if (input.operation === 'reset' && input.value !== undefined && typeof input.value !== 'number') {
      throw new Error('Reset value must be a number');
    }
  }

  /**
   * Execute a counter operation
   * @param input - Counter operation input
   * @returns TaskResult with operation result
   */
  async execute(input: CounterInput): Promise<TaskResult> {
    try {
      this.validateInput(input);

      let result: number;
      let message: string;

      switch (input.operation) {
        case 'increment':
          result = this.counter.increment(input.amount);
          message = `Counter incremented by ${input.amount ?? 1} to ${result}`;
          break;

        case 'decrement':
          result = this.counter.decrement(input.amount);
          message = `Counter decremented by ${input.amount ?? 1} to ${result}`;
          break;

        case 'getValue':
          result = this.counter.getValue();
          message = `Current counter value: ${result}`;
          break;

        case 'reset':
          result = this.counter.reset(input.value);
          message = `Counter reset to ${result}`;
          break;

        default:
          throw new Error(`Unhandled operation: ${input.operation}`);
      }

      return {
        success: true,
        message,
        data: { value: result }
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        data: { value: this.counter.getValue() }
      };
    }
  }

  /**
   * Get the current counter value directly
   * Convenience method for accessing current state
   */
  getCurrentValue(): number {
    return this.counter.getValue();
  }

  /**
   * Reset the counter to initial state
   * Convenience method for resetting
   */
  resetCounter(value: number = 0): void {
    this.counter.reset(value);
  }
}
