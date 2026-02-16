/**
 * Base agent class that all agents extend from
 */

import type { Logger, Task, TaskResult, AgentRole } from '../config/types.js';

/**
 * Abstract base class for all agents
 */
export abstract class BaseAgent {
  protected logger: Logger;
  protected role: AgentRole;

  /**
   * Creates a new agent instance
   * @param role - The role of this agent
   * @param logger - Logger instance for logging
   */
  constructor(role: AgentRole, logger: Logger) {
    this.role = role;
    this.logger = logger;
    this.logger.info(`${this.role} agent initialized`);
  }

  /**
   * Execute a task
   * @param task - The task to execute
   * @returns Promise resolving to the task result
   */
  abstract execute(task: Task): Promise<TaskResult>;

  /**
   * Get the agent's role
   * @returns The agent role
   */
  getRole(): AgentRole {
    return this.role;
  }
}
