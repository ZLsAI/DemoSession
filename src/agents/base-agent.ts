/**
 * Base agent class that all agents should extend
 */

import type { AgentConfig, TaskResult } from '../config/types.js';

/**
 * Simple logger interface for agent logging
 */
interface Logger {
  info(message: string): void;
  error(message: string): void;
  warn(message: string): void;
}

/**
 * Default console logger implementation
 */
class ConsoleLogger implements Logger {
  constructor(private agentName: string) {}

  info(message: string): void {
    console.log(`[${this.agentName}] INFO: ${message}`);
  }

  error(message: string): void {
    console.error(`[${this.agentName}] ERROR: ${message}`);
  }

  warn(message: string): void {
    console.warn(`[${this.agentName}] WARN: ${message}`);
  }
}

/**
 * Abstract base class for all agents in the system.
 * Provides common functionality and enforces the agent contract.
 */
export abstract class BaseAgent {
  protected config: AgentConfig;
  protected logger: Logger;

  /**
   * Creates a new agent instance
   * @param config - Configuration for the agent
   */
  constructor(config: AgentConfig) {
    this.config = config;
    this.logger = new ConsoleLogger(config.name);
  }

  /**
   * Gets the name of the agent
   * @returns The agent's name
   */
  getName(): string {
    return this.config.name;
  }

  /**
   * Abstract method that must be implemented by all agents.
   * Executes the agent's primary task.
   * @param input - Input data for the task
   * @returns A promise that resolves to the task result
   */
  abstract execute(input: unknown): Promise<TaskResult>;
}
