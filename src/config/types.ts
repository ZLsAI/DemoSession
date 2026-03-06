/**
 * Type definitions for the agent system
 */

/**
 * Base configuration for all agents
 */
export interface AgentConfig {
  /** The name of the agent */
  name: string;
}

/**
 * Standard return type for agent operations
 */
export interface TaskResult {
  /** Whether the operation succeeded */
  success: boolean;
  /** The result data from the operation */
  data: unknown;
  /** Timestamp of when the result was produced */
  timestamp: Date;
}

/**
 * Supported counter operations
 */
export type CounterOperation = 'increment' | 'decrement' | 'reset' | 'get';

/**
 * Configuration for the CounterAgent
 */
export interface CounterAgentConfig extends AgentConfig {
  /** Initial value for the counter (defaults to 0) */
  initialValue?: number;
}
