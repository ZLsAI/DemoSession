/**
 * Type definitions for the agent system
 */

/**
 * Available agent roles in the system
 */
export type AgentRole = 'planner' | 'counter';

/**
 * Logger interface for agent logging
 */
export interface Logger {
  info(message: string, ...args: any[]): void;
  error(message: string, ...args: any[]): void;
  warn(message: string, ...args: any[]): void;
  debug(message: string, ...args: any[]): void;
}

/**
 * Base task interface
 */
export interface Task {
  id: string;
  type: string;
  parameters?: Record<string, any>;
  description?: string;
}

/**
 * Counter-specific task interface
 */
export interface CounterTask extends Task {
  type: 'counter';
  parameters: {
    operation: 'increment' | 'decrement';
    amount?: number;
  };
}

/**
 * Result of a task execution
 */
export interface TaskResult {
  success: boolean;
  data?: any;
  error?: string;
  message?: string;
}
