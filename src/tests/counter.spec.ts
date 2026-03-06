import { test, expect } from '@playwright/test';
import { CounterAgent } from '../agents/counter-agent.js';

test.describe('CounterAgent', () => {
  test('should initialize with value 0 by default', async () => {
    const agent = new CounterAgent();
    expect(agent.getCurrentValue()).toBe(0);
  });

  test('should initialize with a custom initial value', async () => {
    const agent = new CounterAgent({ initialValue: 10 });
    expect(agent.getCurrentValue()).toBe(10);
  });

  test('should increment by 1 by default', async () => {
    const agent = new CounterAgent();
    const result = await agent.execute({ operation: 'increment' });
    expect(result.success).toBe(true);
    expect(result.data).toEqual({ value: 1 });
  });

  test('should increment by a custom amount', async () => {
    const agent = new CounterAgent();
    const result = await agent.execute({ operation: 'increment', amount: 5 });
    expect(result.success).toBe(true);
    expect(result.data).toEqual({ value: 5 });
  });

  test('should decrement by 1 by default', async () => {
    const agent = new CounterAgent({ initialValue: 5 });
    const result = await agent.execute({ operation: 'decrement' });
    expect(result.success).toBe(true);
    expect(result.data).toEqual({ value: 4 });
  });

  test('should decrement by a custom amount', async () => {
    const agent = new CounterAgent({ initialValue: 10 });
    const result = await agent.execute({ operation: 'decrement', amount: 3 });
    expect(result.success).toBe(true);
    expect(result.data).toEqual({ value: 7 });
  });

  test('should get the current value', async () => {
    const agent = new CounterAgent({ initialValue: 42 });
    const result = await agent.execute({ operation: 'getValue' });
    expect(result.success).toBe(true);
    expect(result.data).toEqual({ value: 42 });
  });

  test('should reset to 0 by default', async () => {
    const agent = new CounterAgent({ initialValue: 0 });
    await agent.execute({ operation: 'increment', amount: 10 });
    const result = await agent.execute({ operation: 'reset' });
    expect(result.success).toBe(true);
    expect(result.data).toEqual({ value: 0 });
  });

  test('should reset to a custom value', async () => {
    const agent = new CounterAgent();
    await agent.execute({ operation: 'increment', amount: 10 });
    const result = await agent.execute({ operation: 'reset', value: 5 });
    expect(result.success).toBe(true);
    expect(result.data).toEqual({ value: 5 });
  });

  test('should return correct agent name', () => {
    const agent = new CounterAgent();
    expect(agent.getName()).toBe('CounterAgent');
  });

  test('should return custom agent name from config', () => {
    const agent = new CounterAgent({ name: 'MyCounter' });
    expect(agent.getName()).toBe('MyCounter');
  });

  test('should handle a sequence of operations', async () => {
    const agent = new CounterAgent();

    await agent.execute({ operation: 'increment' });
    await agent.execute({ operation: 'increment', amount: 5 });
    const result1 = await agent.execute({ operation: 'getValue' });
    expect(result1.data).toEqual({ value: 6 });

    await agent.execute({ operation: 'decrement', amount: 2 });
    const result2 = await agent.execute({ operation: 'getValue' });
    expect(result2.data).toEqual({ value: 4 });

    const result3 = await agent.execute({ operation: 'reset' });
    expect(result3.data).toEqual({ value: 0 });
  });

  test('should allow counter to go negative', async () => {
    const agent = new CounterAgent();
    const result = await agent.execute({ operation: 'decrement', amount: 5 });
    expect(result.success).toBe(true);
    expect(result.data).toEqual({ value: -5 });
  });
});
