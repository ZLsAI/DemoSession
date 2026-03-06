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
 * Abstract base class for all agents
 * Provides logging, configuration management, and defines the execute() contract
 */
export abstract class BaseAgent {
  protected readonly config: AgentConfig;
  protected readonly logger: Logger;

  constructor(config: AgentConfig) {
    this.config = config;
    this.logger = new ConsoleLogger(config.name);
    this.logger.info(`Agent initialized`);
  }

  /**
   * Execute the agent's primary task
   * @param input - Input data for the task
   * @returns A promise resolving to a TaskResult
   */
  abstract execute(input: unknown): Promise<TaskResult>;

  /**
   * Get the agent's name
   */
  getName(): string {
    return this.config.name;
  }
}
