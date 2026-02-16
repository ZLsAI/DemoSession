/**
 * Counter agent that handles increment and decrement operations
 */

import { BaseAgent } from './base-agent.js';
import type { Logger, Task, TaskResult, CounterTask } from '../config/types.js';

/**
 * Counter agent that maintains a count and supports increment/decrement operations
 */
export class CounterAgent extends BaseAgent {
  private count: number = 0;

  /**
   * Creates a new Counter agent instance
   * @param logger - Logger instance for logging
   */
  constructor(logger: Logger) {
    super('counter', logger);
  }

  /**
   * Execute a counter task (increment or decrement)
   * @param task - The counter task to execute
   * @returns Promise resolving to the task result with current count
   */
  async execute(task: Task): Promise<TaskResult> {
    try {
      // Validate task type
      if (task.type !== 'counter') {
        const error = `Invalid task type: ${task.type}. Expected 'counter'.`;
        this.logger.error(error);
        return {
          success: false,
          error,
        };
      }

      // Validate parameters exist
      if (!task.parameters) {
        const error = 'Task parameters are required';
        this.logger.error(error);
        return {
          success: false,
          error,
        };
      }

      const counterTask = task as CounterTask;
      const { operation, amount = 1 } = counterTask.parameters;

      // Validate operation
      if (!operation || (operation !== 'increment' && operation !== 'decrement')) {
        const error = `Invalid operation: ${operation}. Must be 'increment' or 'decrement'.`;
        this.logger.error(error);
        return {
          success: false,
          error,
        };
      }

      // Validate amount
      if (typeof amount !== 'number' || amount < 0) {
        const error = `Invalid amount: ${amount}. Must be a non-negative number.`;
        this.logger.error(error);
        return {
          success: false,
          error,
        };
      }

      // Perform operation
      const previousCount = this.count;
      if (operation === 'increment') {
        this.count += amount;
        this.logger.info(`Counter incremented by ${amount}: ${previousCount} -> ${this.count}`);
      } else {
        this.count -= amount;
        this.logger.info(`Counter decremented by ${amount}: ${previousCount} -> ${this.count}`);
      }

      return {
        success: true,
        data: {
          count: this.count,
          previousCount,
          operation,
          amount,
        },
        message: `Successfully ${operation}ed counter by ${amount}. Current count: ${this.count}`,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      this.logger.error(`Error executing counter task: ${errorMessage}`);
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  /**
   * Get the current count value
   * @returns The current count
   */
  getCount(): number {
    return this.count;
  }

  /**
   * Reset the counter to zero
   */
  reset(): void {
    const previousCount = this.count;
    this.count = 0;
    this.logger.info(`Counter reset from ${previousCount} to 0`);
  }
}
