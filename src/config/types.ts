/**
 * Core types for the agent system
 */

/**
 * Configuration for an agent
 */
export interface AgentConfig {
  /** Name of the agent */
  name: string;
  /** Optional timeout in milliseconds */
  timeout?: number;
  /** Optional retry count for failed operations */
  retryCount?: number;
}

/**
 * Result of a task execution
 */
export interface TaskResult {
  /** Whether the task was successful */
  success: boolean;
  /** Optional data returned by the task */
  data?: unknown;
  /** Optional error message if task failed */
  error?: string;
  /** Timestamp when the task completed */
  timestamp: Date;
}

/**
 * Counter operation types
 */
export type CounterOperation = 'increment' | 'decrement' | 'reset' | 'getValue';

/**
 * Configuration specific to the counter agent
 */
export interface CounterAgentConfig extends AgentConfig {
  /** Initial value for the counter (default: 0) */
  initialValue?: number;
}
