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
export abstract class BaseAgent<TConfig extends AgentConfig = AgentConfig> {
  protected readonly logger: Logger;
  protected readonly config: TConfig;

  constructor(config: TConfig = {} as TConfig) {
    this.config = config;
    this.logger = new ConsoleLogger(this.getName());
  }

  /**
   * Returns the name of the agent
   */
  abstract getName(): string;

  /**
   * Executes the agent's primary operation
   * @param input - Operation-specific input
   * @returns Promise resolving to a TaskResult
   */
  abstract execute(input: unknown): Promise<TaskResult>;
}
