/**
 * Counter agent implementation
 * Demonstrates simple state management with increment and decrement operations
 */

import { BaseAgent } from './base-agent.js';
import type { CounterAgentConfig, CounterOperation, TaskResult } from '../config/types.js';

/**
 * Input type for the counter agent's execute method
 */
interface CounterInput {
  operation: CounterOperation;
}

/**
 * A simple counter agent that maintains a numeric counter value
 * and supports increment, decrement, reset, and get operations
 */
export class CounterAgent extends BaseAgent {
  private value: number;
  private readonly initialValue: number;

  /**
   * Create a new CounterAgent
   * @param config - Configuration including name and optional initialValue
   */
  constructor(config: CounterAgentConfig) {
    super(config);
    this.initialValue = config.initialValue ?? 0;
    this.value = this.initialValue;
    this.logger.info(`Counter initialized with value: ${this.value}`);
  }

  /**
   * Increment the counter by 1
   * @returns The new counter value
   */
  increment(): number {
    this.value += 1;
    this.logger.info(`Incremented counter to: ${this.value}`);
    return this.value;
  }

  /**
   * Decrement the counter by 1
   * @returns The new counter value
   */
  decrement(): number {
    this.value -= 1;
    this.logger.info(`Decremented counter to: ${this.value}`);
    return this.value;
  }

  /**
   * Get the current counter value
   * @returns The current counter value
   */
  getValue(): number {
    return this.value;
  }

  /**
   * Reset the counter to its initial value
   * @returns The reset counter value
   */
  reset(): number {
    this.value = this.initialValue;
    this.logger.info(`Counter reset to initial value: ${this.value}`);
    return this.value;
  }

  /**
   * Execute a counter operation via input object (for workflow integration)
   * @param input - Object containing the operation to perform
   * @returns A TaskResult with success status, resulting value, and timestamp
   */
  async execute(input: CounterInput): Promise<TaskResult> {
    try {
      let data: number;

      switch (input.operation) {
        case 'increment':
          data = this.increment();
          break;
        case 'decrement':
          data = this.decrement();
          break;
        case 'reset':
          data = this.reset();
          break;
        case 'get':
          data = this.getValue();
          break;
        default:
          throw new Error(`Unknown operation: ${(input as CounterInput).operation}`);
      }

      return {
        success: true,
        data,
        timestamp: new Date(),
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Operation failed: ${message}`);
      return {
        success: false,
        data: null,
        timestamp: new Date(),
      };
    }
  }
}
