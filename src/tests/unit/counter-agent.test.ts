/**
 * Unit tests for Counter Agent
 */

import { CounterAgent } from '../../agents/counter-agent.js';
import type { Logger, CounterTask } from '../../config/types.js';

// Mock logger for testing
const mockLogger: Logger = {
  info: () => {},
  error: () => {},
  warn: () => {},
  debug: () => {},
};

describe('CounterAgent', () => {
  describe('Initialization', () => {
    it('should initialize with count of 0', () => {
      const agent = new CounterAgent(mockLogger);
      expect(agent.getCount()).toBe(0);
    });

    it('should have counter role', () => {
      const agent = new CounterAgent(mockLogger);
      expect(agent.getRole()).toBe('counter');
    });
  });

  describe('Increment operation', () => {
    it('should increment by 1 by default', async () => {
      const agent = new CounterAgent(mockLogger);
      const task: CounterTask = {
        id: 'test-1',
        type: 'counter',
        parameters: { operation: 'increment' },
      };
      
      const result = await agent.execute(task);
      
      expect(result.success).toBe(true);
      expect(agent.getCount()).toBe(1);
      expect(result.data.count).toBe(1);
      expect(result.data.previousCount).toBe(0);
    });

    it('should increment by specified amount', async () => {
      const agent = new CounterAgent(mockLogger);
      const task: CounterTask = {
        id: 'test-2',
        type: 'counter',
        parameters: { operation: 'increment', amount: 5 },
      };
      
      const result = await agent.execute(task);
      
      expect(result.success).toBe(true);
      expect(agent.getCount()).toBe(5);
      expect(result.data.amount).toBe(5);
    });

    it('should increment multiple times correctly', async () => {
      const agent = new CounterAgent(mockLogger);
      
      await agent.execute({
        id: 'test-3a',
        type: 'counter',
        parameters: { operation: 'increment', amount: 3 },
      });
      
      const result = await agent.execute({
        id: 'test-3b',
        type: 'counter',
        parameters: { operation: 'increment', amount: 2 },
      });
      
      expect(result.success).toBe(true);
      expect(agent.getCount()).toBe(5);
      expect(result.data.previousCount).toBe(3);
    });
  });

  describe('Decrement operation', () => {
    it('should decrement by 1 by default', async () => {
      const agent = new CounterAgent(mockLogger);
      // First increment to have a value to decrement from
      await agent.execute({
        id: 'setup',
        type: 'counter',
        parameters: { operation: 'increment', amount: 5 },
      });
      
      const task: CounterTask = {
        id: 'test-4',
        type: 'counter',
        parameters: { operation: 'decrement' },
      };
      
      const result = await agent.execute(task);
      
      expect(result.success).toBe(true);
      expect(agent.getCount()).toBe(4);
      expect(result.data.previousCount).toBe(5);
    });

    it('should decrement by specified amount', async () => {
      const agent = new CounterAgent(mockLogger);
      await agent.execute({
        id: 'setup',
        type: 'counter',
        parameters: { operation: 'increment', amount: 10 },
      });
      
      const task: CounterTask = {
        id: 'test-5',
        type: 'counter',
        parameters: { operation: 'decrement', amount: 3 },
      };
      
      const result = await agent.execute(task);
      
      expect(result.success).toBe(true);
      expect(agent.getCount()).toBe(7);
      expect(result.data.amount).toBe(3);
    });

    it('should allow decrement to negative values', async () => {
      const agent = new CounterAgent(mockLogger);
      
      const result = await agent.execute({
        id: 'test-6',
        type: 'counter',
        parameters: { operation: 'decrement', amount: 5 },
      });
      
      expect(result.success).toBe(true);
      expect(agent.getCount()).toBe(-5);
    });
  });

  describe('Validation', () => {
    it('should fail with invalid task type', async () => {
      const agent = new CounterAgent(mockLogger);
      const task = {
        id: 'test-7',
        type: 'invalid',
        parameters: { operation: 'increment' },
      } as any;
      
      const result = await agent.execute(task);
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('Invalid task type');
    });

    it('should fail with missing parameters', async () => {
      const agent = new CounterAgent(mockLogger);
      const task = {
        id: 'test-8',
        type: 'counter',
      } as any;
      
      const result = await agent.execute(task);
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('parameters are required');
    });

    it('should fail with invalid operation', async () => {
      const agent = new CounterAgent(mockLogger);
      const task = {
        id: 'test-9',
        type: 'counter',
        parameters: { operation: 'multiply' },
      } as any;
      
      const result = await agent.execute(task);
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('Invalid operation');
    });

    it('should fail with negative amount', async () => {
      const agent = new CounterAgent(mockLogger);
      const task: CounterTask = {
        id: 'test-10',
        type: 'counter',
        parameters: { operation: 'increment', amount: -5 },
      };
      
      const result = await agent.execute(task);
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('Invalid amount');
    });

    it('should fail with non-numeric amount', async () => {
      const agent = new CounterAgent(mockLogger);
      const task = {
        id: 'test-11',
        type: 'counter',
        parameters: { operation: 'increment', amount: 'five' },
      } as any;
      
      const result = await agent.execute(task);
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('Invalid amount');
    });
  });

  describe('State management', () => {
    it('should persist count across multiple operations', async () => {
      const agent = new CounterAgent(mockLogger);
      
      await agent.execute({
        id: 'op-1',
        type: 'counter',
        parameters: { operation: 'increment', amount: 5 },
      });
      
      await agent.execute({
        id: 'op-2',
        type: 'counter',
        parameters: { operation: 'decrement', amount: 2 },
      });
      
      await agent.execute({
        id: 'op-3',
        type: 'counter',
        parameters: { operation: 'increment', amount: 7 },
      });
      
      expect(agent.getCount()).toBe(10);
    });

    it('should reset count to 0', () => {
      const agent = new CounterAgent(mockLogger);
      
      // Set some value
      agent.execute({
        id: 'setup',
        type: 'counter',
        parameters: { operation: 'increment', amount: 42 },
      });
      
      agent.reset();
      expect(agent.getCount()).toBe(0);
    });

    it('should maintain separate state for different instances', async () => {
      const agent1 = new CounterAgent(mockLogger);
      const agent2 = new CounterAgent(mockLogger);
      
      await agent1.execute({
        id: 'a1',
        type: 'counter',
        parameters: { operation: 'increment', amount: 5 },
      });
      
      await agent2.execute({
        id: 'a2',
        type: 'counter',
        parameters: { operation: 'increment', amount: 10 },
      });
      
      expect(agent1.getCount()).toBe(5);
      expect(agent2.getCount()).toBe(10);
    });
  });
});
