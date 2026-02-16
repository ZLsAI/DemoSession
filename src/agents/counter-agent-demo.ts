/**
 * Example usage of the Counter agent
 * Run with: npx tsx src/agents/counter-agent-demo.ts
 */

import { CounterAgent } from './counter-agent.js';
import type { Logger, CounterTask } from '../config/types.js';

// Simple console logger implementation
const consoleLogger: Logger = {
  info: (message: string, ...args: any[]) => console.log(`[INFO] ${message}`, ...args),
  error: (message: string, ...args: any[]) => console.error(`[ERROR] ${message}`, ...args),
  warn: (message: string, ...args: any[]) => console.warn(`[WARN] ${message}`, ...args),
  debug: (message: string, ...args: any[]) => console.debug(`[DEBUG] ${message}`, ...args),
};

async function demo() {
  console.log('=== Counter Agent Demo ===\n');

  // Create a counter agent
  const counterAgent = new CounterAgent(consoleLogger);
  console.log(`Initial count: ${counterAgent.getCount()}\n`);

  // Test 1: Increment by 1
  console.log('Test 1: Increment by 1');
  const task1: CounterTask = {
    id: 'task-1',
    type: 'counter',
    parameters: {
      operation: 'increment',
    },
  };
  const result1 = await counterAgent.execute(task1);
  console.log('Result:', JSON.stringify(result1, null, 2));
  console.log(`Current count: ${counterAgent.getCount()}\n`);

  // Test 2: Increment by 5
  console.log('Test 2: Increment by 5');
  const task2: CounterTask = {
    id: 'task-2',
    type: 'counter',
    parameters: {
      operation: 'increment',
      amount: 5,
    },
  };
  const result2 = await counterAgent.execute(task2);
  console.log('Result:', JSON.stringify(result2, null, 2));
  console.log(`Current count: ${counterAgent.getCount()}\n`);

  // Test 3: Decrement by 2
  console.log('Test 3: Decrement by 2');
  const task3: CounterTask = {
    id: 'task-3',
    type: 'counter',
    parameters: {
      operation: 'decrement',
      amount: 2,
    },
  };
  const result3 = await counterAgent.execute(task3);
  console.log('Result:', JSON.stringify(result3, null, 2));
  console.log(`Current count: ${counterAgent.getCount()}\n`);

  // Test 4: Invalid operation
  console.log('Test 4: Invalid operation (should fail)');
  const task4 = {
    id: 'task-4',
    type: 'counter',
    parameters: {
      operation: 'invalid',
    },
  } as any;
  const result4 = await counterAgent.execute(task4);
  console.log('Result:', JSON.stringify(result4, null, 2));
  console.log(`Current count: ${counterAgent.getCount()}\n`);

  // Test 5: Reset counter
  console.log('Test 5: Reset counter');
  counterAgent.reset();
  console.log(`Current count after reset: ${counterAgent.getCount()}\n`);

  console.log('=== Demo Complete ===');
}

demo().catch(console.error);
