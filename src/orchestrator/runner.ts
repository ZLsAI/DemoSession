import { CounterAgent, CounterTask, CounterResult } from '../agents/counter-agent.js';

/**
 * Available agent types in the orchestrator
 */
export type AgentType = 'counter';

/**
 * Task configuration that can be routed to different agents
 */
export interface Task {
  agentType: AgentType;
  payload: any;
}

/**
 * Agent registry for managing available agents
 */
class AgentRegistry {
  private agents: Map<AgentType, any>;

  constructor() {
    this.agents = new Map();
    this.registerDefaultAgents();
  }

  /**
   * Registers default agents available in the system
   */
  private registerDefaultAgents(): void {
    // Register counter agent
    this.agents.set('counter', CounterAgent);
  }

  /**
   * Gets an agent by type
   * @param type - The agent type to retrieve
   * @returns The agent class
   */
  getAgent(type: AgentType): any {
    const agent = this.agents.get(type);
    if (!agent) {
      throw new Error(`Agent type '${type}' not found in registry`);
    }
    return agent;
  }

  /**
   * Checks if an agent type is registered
   * @param type - The agent type to check
   * @returns True if the agent is registered
   */
  hasAgent(type: AgentType): boolean {
    return this.agents.has(type);
  }

  /**
   * Lists all registered agent types
   * @returns Array of registered agent types
   */
  listAgents(): AgentType[] {
    return Array.from(this.agents.keys());
  }
}

/**
 * Orchestrator Runner - Routes tasks to appropriate agents
 */
export class Runner {
  private registry: AgentRegistry;
  private agentInstances: Map<AgentType, any>;

  constructor() {
    this.registry = new AgentRegistry();
    this.agentInstances = new Map();
  }

  /**
   * Executes a task by routing it to the appropriate agent
   * @param task - The task to execute
   * @returns The result from the agent
   */
  async executeTask(task: Task): Promise<any> {
    if (!this.registry.hasAgent(task.agentType)) {
      throw new Error(`Unknown agent type: ${task.agentType}`);
    }

    // Get or create agent instance
    let agent = this.agentInstances.get(task.agentType);
    if (!agent) {
      const AgentClass = this.registry.getAgent(task.agentType);
      agent = new AgentClass();
      this.agentInstances.set(task.agentType, agent);
    }

    // Execute the task
    return await agent.execute(task.payload);
  }

  /**
   * Gets a list of available agent types
   * @returns Array of available agent types
   */
  getAvailableAgents(): AgentType[] {
    return this.registry.listAgents();
  }

  /**
   * Resets all agent instances
   */
  resetAgents(): void {
    this.agentInstances.clear();
  }
}

// Export a singleton instance
export const runner = new Runner();
