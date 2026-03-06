import { test, expect } from '@playwright/test';
import { CounterAgent } from '../agents/counter-agent.js';
import { BaseAgent } from '../agents/base-agent.js';

test.describe('CounterAgent', () => {
  test('should be an instance of BaseAgent', async () => {
    const agent = new CounterAgent();
    expect(agent).toBeInstanceOf(BaseAgent);
  });

  test('should have correct agent name', async () => {
    const agent = new CounterAgent();
    expect(agent.getName()).toBe('CounterAgent');
  });

  test.describe('increment operation', () => {
    test('should increment counter from 0 to 1', async () => {
      const agent = new CounterAgent();
      const result = await agent.execute({ operation: 'increment' });
      
      expect(result.success).toBe(true);
      expect(result.data.value).toBe(1);
      expect(result.message).toContain('incremented');
    });

    test('should increment counter multiple times (0 → 1 → 2)', async () => {
      const agent = new CounterAgent();
      
      let result = await agent.execute({ operation: 'increment' });
      expect(result.data.value).toBe(1);
      
      result = await agent.execute({ operation: 'increment' });
      expect(result.data.value).toBe(2);
    });

    test('should increment by custom amount', async () => {
      const agent = new CounterAgent();
      const result = await agent.execute({ operation: 'increment', amount: 5 });
      
      expect(result.success).toBe(true);
      expect(result.data.value).toBe(5);
    });

    test('should increment by decimal amount', async () => {
      const agent = new CounterAgent();
      const result = await agent.execute({ operation: 'increment', amount: 2.5 });
      
      expect(result.success).toBe(true);
      expect(result.data.value).toBe(2.5);
    });
  });

  test.describe('decrement operation', () => {
    test('should decrement counter', async () => {
      const agent = new CounterAgent();
      
      // First increment to 2
      await agent.execute({ operation: 'increment' });
      await agent.execute({ operation: 'increment' });
      
      // Then decrement
      const result = await agent.execute({ operation: 'decrement' });
      expect(result.success).toBe(true);
      expect(result.data.value).toBe(1);
      expect(result.message).toContain('decremented');
    });

    test('should decrement multiple times (2 → 1 → 0)', async () => {
      const agent = new CounterAgent();
      
      // Setup: increment to 2
      await agent.execute({ operation: 'increment' });
      await agent.execute({ operation: 'increment' });
      
      // Test: decrement to 1
      let result = await agent.execute({ operation: 'decrement' });
      expect(result.data.value).toBe(1);
      
      // Test: decrement to 0
      result = await agent.execute({ operation: 'decrement' });
      expect(result.data.value).toBe(0);
    });

    test('should decrement by custom amount', async () => {
      const agent = new CounterAgent();
      await agent.execute({ operation: 'increment', amount: 10 });
      
      const result = await agent.execute({ operation: 'decrement', amount: 3 });
      expect(result.success).toBe(true);
      expect(result.data.value).toBe(7);
    });

    test('should handle decrementing below zero', async () => {
      const agent = new CounterAgent();
      const result = await agent.execute({ operation: 'decrement' });
      
      expect(result.success).toBe(true);
      expect(result.data.value).toBe(-1);
    });

    test('should handle multiple decrements below zero', async () => {
      const agent = new CounterAgent();
      
      await agent.execute({ operation: 'decrement' });
      await agent.execute({ operation: 'decrement' });
      const result = await agent.execute({ operation: 'decrement' });
      
      expect(result.data.value).toBe(-3);
    });
  });

  test.describe('getValue operation', () => {
    test('should return initial value of 0', async () => {
      const agent = new CounterAgent();
      const result = await agent.execute({ operation: 'getValue' });
      
      expect(result.success).toBe(true);
      expect(result.data.value).toBe(0);
      expect(result.message).toContain('Current counter value');
    });

    test('should return correct value after operations', async () => {
      const agent = new CounterAgent();
      
      await agent.execute({ operation: 'increment', amount: 5 });
      await agent.execute({ operation: 'decrement', amount: 2 });
      
      const result = await agent.execute({ operation: 'getValue' });
      expect(result.data.value).toBe(3);
    });

    test('should return correct negative value', async () => {
      const agent = new CounterAgent();
      
      await agent.execute({ operation: 'decrement', amount: 10 });
      
      const result = await agent.execute({ operation: 'getValue' });
      expect(result.data.value).toBe(-10);
    });
  });

  test.describe('reset operation', () => {
    test('should reset counter to 0', async () => {
      const agent = new CounterAgent();
      
      await agent.execute({ operation: 'increment', amount: 10 });
      const result = await agent.execute({ operation: 'reset' });
      
      expect(result.success).toBe(true);
      expect(result.data.value).toBe(0);
      expect(result.message).toContain('reset');
    });

    test('should reset counter to custom value', async () => {
      const agent = new CounterAgent();
      
      await agent.execute({ operation: 'increment', amount: 10 });
      const result = await agent.execute({ operation: 'reset', value: 5 });
      
      expect(result.success).toBe(true);
      expect(result.data.value).toBe(5);
    });

    test('should reset negative counter to 0', async () => {
      const agent = new CounterAgent();
      
      await agent.execute({ operation: 'decrement', amount: 5 });
      const result = await agent.execute({ operation: 'reset' });
      
      expect(result.data.value).toBe(0);
    });

    test('should reset to negative value', async () => {
      const agent = new CounterAgent();
      const result = await agent.execute({ operation: 'reset', value: -10 });
      
      expect(result.success).toBe(true);
      expect(result.data.value).toBe(-10);
    });
  });

  test.describe('edge cases and error handling', () => {
    test('should handle invalid operation', async () => {
      const agent = new CounterAgent();
      const result = await agent.execute({ operation: 'invalid' as any });
      
      expect(result.success).toBe(false);
      expect(result.message).toContain('Invalid operation');
    });

    test('should handle missing operation', async () => {
      const agent = new CounterAgent();
      const result = await agent.execute({} as any);
      
      expect(result.success).toBe(false);
      expect(result.message).toContain('Invalid operation');
    });

    test('should handle null input', async () => {
      const agent = new CounterAgent();
      const result = await agent.execute(null as any);
      
      expect(result.success).toBe(false);
      expect(result.message).toContain('Input must be an object');
    });

    test('should handle non-numeric amount for increment', async () => {
      const agent = new CounterAgent();
      const result = await agent.execute({ operation: 'increment', amount: 'invalid' as any });
      
      expect(result.success).toBe(false);
      expect(result.message).toContain('Amount must be a number');
    });

    test('should handle non-numeric amount for decrement', async () => {
      const agent = new CounterAgent();
      const result = await agent.execute({ operation: 'decrement', amount: 'invalid' as any });
      
      expect(result.success).toBe(false);
      expect(result.message).toContain('Amount must be a number');
    });

    test('should handle non-numeric reset value', async () => {
      const agent = new CounterAgent();
      const result = await agent.execute({ operation: 'reset', value: 'invalid' as any });
      
      expect(result.success).toBe(false);
      expect(result.message).toContain('Reset value must be a number');
    });

    test('should maintain state across multiple operations', async () => {
      const agent = new CounterAgent();
      
      await agent.execute({ operation: 'increment', amount: 5 });
      await agent.execute({ operation: 'increment', amount: 3 });
      await agent.execute({ operation: 'decrement', amount: 2 });
      await agent.execute({ operation: 'increment', amount: 1 });
      
      const result = await agent.execute({ operation: 'getValue' });
      expect(result.data.value).toBe(7); // 5 + 3 - 2 + 1 = 7
    });

    test('should handle large numbers', async () => {
      const agent = new CounterAgent();
      const result = await agent.execute({ operation: 'increment', amount: 1000000 });
      
      expect(result.success).toBe(true);
      expect(result.data.value).toBe(1000000);
    });

    test('should handle very small decimal increments', async () => {
      const agent = new CounterAgent();
      const result = await agent.execute({ operation: 'increment', amount: 0.001 });
      
      expect(result.success).toBe(true);
      expect(result.data.value).toBeCloseTo(0.001, 3);
    });
  });

  test.describe('convenience methods', () => {
    test('getCurrentValue should return current state', async () => {
      const agent = new CounterAgent();
      
      await agent.execute({ operation: 'increment', amount: 7 });
      expect(agent.getCurrentValue()).toBe(7);
    });

    test('resetCounter should reset to default 0', async () => {
      const agent = new CounterAgent();
      
      await agent.execute({ operation: 'increment', amount: 10 });
      agent.resetCounter();
      expect(agent.getCurrentValue()).toBe(0);
    });

    test('resetCounter should reset to custom value', async () => {
      const agent = new CounterAgent();
      
      await agent.execute({ operation: 'increment', amount: 10 });
      agent.resetCounter(5);
      expect(agent.getCurrentValue()).toBe(5);
    });
  });

  test.describe('BaseAgent interface compliance', () => {
    test('should implement execute method', async () => {
      const agent = new CounterAgent();
      expect(typeof agent.execute).toBe('function');
    });

    test('should return TaskResult from execute', async () => {
      const agent = new CounterAgent();
      const result = await agent.execute({ operation: 'getValue' });
      
      expect(result).toHaveProperty('success');
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('data');
      expect(typeof result.success).toBe('boolean');
      expect(typeof result.message).toBe('string');
    });

    test('should have getName method', () => {
      const agent = new CounterAgent();
      expect(typeof agent.getName).toBe('function');
      expect(typeof agent.getName()).toBe('string');
    });

    test('execute should return Promise', () => {
      const agent = new CounterAgent();
      const result = agent.execute({ operation: 'getValue' });
      expect(result).toBeInstanceOf(Promise);
    });
  });
});
