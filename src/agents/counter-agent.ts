/**
 * Counter agent implementation
 * Demonstrates state management in workflow agents
 */

import { BaseAgent } from './base-agent.js';
import { Counter } from '../utils/counter.js';
import type { CounterAgentConfig, CounterInput, TaskResult } from '../config/types.js';

/**
 * CounterAgent - A concrete agent that manages a numeric counter
 *
 * Supports increment, decrement, getValue, and reset operations.
 * Serves as an educational example of stateful agent implementation.
 */
export class CounterAgent extends BaseAgent<CounterAgentConfig> {
  private readonly counter: Counter;

  /**
   * Creates a new CounterAgent
   * @param config - Optional configuration including name and initialValue
   */
  constructor(config: CounterAgentConfig = {}) {
    super(config);
    this.counter = new Counter(config.initialValue ?? 0);
  }

  /**
   * Returns the name of this agent
   */
  getName(): string {
    return this.config.name ?? 'CounterAgent';
  }

  /**
   * Executes a counter operation
   * @param input - The counter operation input
   * @returns Promise resolving to a TaskResult with the counter value
   */
  async execute(input: CounterInput): Promise<TaskResult> {
    try {
      switch (input.operation) {
        case 'increment': {
          const amount = input.amount ?? 1;
          const newValue = this.counter.increment(amount);
          this.logger.info(`Incremented by ${amount} to ${newValue}`);
          return {
            success: true,
            message: `Counter incremented by ${amount} to ${newValue}`,
            data: { value: newValue },
          };
        }

        case 'decrement': {
          const amount = input.amount ?? 1;
          const newValue = this.counter.decrement(amount);
          this.logger.info(`Decremented by ${amount} to ${newValue}`);
          return {
            success: true,
            message: `Counter decremented by ${amount} to ${newValue}`,
            data: { value: newValue },
          };
        }

        case 'getValue': {
          const currentValue = this.counter.getValue();
          this.logger.info(`Current value: ${currentValue}`);
          return {
            success: true,
            message: `Current counter value is ${currentValue}`,
            data: { value: currentValue },
          };
        }

        case 'reset': {
          const resetTo = input.value;
          const newValue = this.counter.reset(resetTo);
          this.logger.info(`Reset to ${newValue}`);
          return {
            success: true,
            message: `Counter reset to ${newValue}`,
            data: { value: newValue },
          };
        }

        default: {
          const invalidOp = (input as CounterInput).operation;
          this.logger.error(`Invalid operation: ${invalidOp}`);
          return {
            success: false,
            message: `Invalid operation. Must be one of: increment, decrement, getValue, reset`,
            data: { value: this.counter.getValue() },
          };
        }
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Operation failed: ${message}`);
      return {
        success: false,
        message: `Operation failed: ${message}`,
        data: { value: this.counter.getValue() },
      };
    }
  }

  /**
   * Convenience method to get the current counter value directly
   */
  getCurrentValue(): number {
    return this.counter.getValue();
  }

  /**
   * Convenience method to reset the counter
   * @param value - Value to reset to (default: 0)
   */
  resetCounter(value?: number): void {
    this.counter.reset(value);
  }
}
