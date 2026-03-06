/**
 * Result of a task execution
 */
export interface TaskResult {
  success: boolean;
  message: string;
  data?: any;
}

/**
 * Base class for all agents in the workflow system
 * Provides a common interface for agent execution
 */
export abstract class BaseAgent {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  /**
   * Get the name of the agent
   */
  getName(): string {
    return this.name;
  }

  /**
   * Execute the agent's task
   * Must be implemented by derived classes
   */
  abstract execute(input: any): Promise<TaskResult>;

  /**
   * Validate input before execution
   * Can be overridden by derived classes
   */
  protected validateInput(input: any): void {
    // Default implementation - can be overridden
  }
}
