/**
 * Counter agent implementation demonstrating simple state management
 */

import { BaseAgent } from './base-agent.js';
import type { CounterAgentConfig, TaskResult, CounterOperation } from '../config/types.js';

/**
 * Input for counter agent operations
 */
interface CounterInput {
  operation: CounterOperation;
}

/**
 * CounterAgent demonstrates simple state management with increment/decrement operations.
 * This serves as an educational example of how agents can maintain and manipulate state
 * within the workflow orchestration system.
 * 
 * @example
 * ```typescript
 * const counter = new CounterAgent({ name: 'MyCounter', initialValue: 0 });
 * counter.increment();
 * console.log(counter.getValue()); // 1
 * counter.decrement();
 * console.log(counter.getValue()); // 0
 * ```
 */
export class CounterAgent extends BaseAgent {
  private value: number;

  /**
   * Creates a new CounterAgent instance
   * @param config - Configuration for the counter agent
   */
  constructor(config: CounterAgentConfig) {
    super(config);
    this.value = config.initialValue ?? 0;
    this.logger.info(`Counter initialized with value: ${this.value}`);
  }

  /**
   * Increments the counter by 1
   * @returns The new counter value
   */
  increment(): number {
    this.value += 1;
    this.logger.info(`Counter incremented to: ${this.value}`);
    return this.value;
  }

  /**
   * Decrements the counter by 1
   * @returns The new counter value
   */
  decrement(): number {
    this.value -= 1;
    this.logger.info(`Counter decremented to: ${this.value}`);
    return this.value;
  }

  /**
   * Gets the current counter value
   * @returns The current counter value
   */
  getValue(): number {
    return this.value;
  }

  /**
   * Resets the counter to 0
   * @returns The reset value (0)
   */
  reset(): number {
    this.value = 0;
    this.logger.info('Counter reset to: 0');
    return this.value;
  }

  /**
   * Executes a counter operation based on the input
   * @param input - The operation to perform
   * @returns A promise that resolves to the task result
   */
  async execute(input: unknown): Promise<TaskResult> {
    try {
      // Validate input
      if (!input || typeof input !== 'object') {
        throw new Error('Input must be an object with an operation property');
      }

      const counterInput = input as CounterInput;
      
      if (!counterInput.operation) {
        throw new Error('Operation is required');
      }

      let result: number;

      // Execute the requested operation
      switch (counterInput.operation) {
        case 'increment':
          result = this.increment();
          break;
        case 'decrement':
          result = this.decrement();
          break;
        case 'reset':
          result = this.reset();
          break;
        case 'getValue':
          result = this.getValue();
          break;
        default:
          throw new Error(`Unknown operation: ${counterInput.operation}`);
      }

      return {
        success: true,
        data: result,
        timestamp: new Date(),
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      this.logger.error(`Operation failed: ${errorMessage}`);
      
      return {
        success: false,
        error: errorMessage,
        timestamp: new Date(),
      };
    }
  }
}
