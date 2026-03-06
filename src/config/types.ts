/**
 * TypeScript type definitions for the agent system
 */

/**
 * Base configuration for all agents
 */
export interface AgentConfig {
  name?: string;
  [key: string]: unknown;
}

/**
 * Standard return type for agent operations
 */
export interface TaskResult {
  success: boolean;
  message: string;
  data?: unknown;
}

/**
 * Type-safe counter operation definitions
 */
export type CounterOperation = 'increment' | 'decrement' | 'getValue' | 'reset';

/**
 * Counter-specific configuration
 */
export interface CounterAgentConfig extends AgentConfig {
  initialValue?: number;
}

/**
 * Input type for counter agent operations
 */
export interface CounterInput {
  operation: CounterOperation;
  amount?: number;
  value?: number;
}
