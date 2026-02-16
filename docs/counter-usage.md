# Counter Usage Guide

## Overview

The Counter component provides a simple, accessible counter with increment, decrement, and reset functionality. It includes a TypeScript utility class, an agent interface for task orchestration, and comprehensive E2E testing.

## Architecture

The counter implementation consists of three main components:

1. **Counter Utility Class** (`src/utils/counter.ts`) - Core counter logic
2. **Counter Agent** (`src/agents/counter-agent.ts`) - Agent interface for orchestrator
3. **Orchestrator Runner** (`src/orchestrator/runner.ts`) - Task routing and execution

## Using the Counter Utility Class

### Basic Usage

```typescript
import { Counter } from './src/utils/counter.js';

// Create a new counter with initial value 0
const counter = new Counter();

// Or with a custom initial value
const counter = new Counter(10);

// Get current value
console.log(counter.getValue()); // 0 or 10

// Increment
counter.increment(); // +1
console.log(counter.getValue()); // 1 or 11

// Increment by custom amount
counter.increment(5); // +5
console.log(counter.getValue()); // 6 or 16

// Decrement
counter.decrement(); // -1
console.log(counter.getValue()); // 5 or 15

// Decrement by custom amount
counter.decrement(3); // -3
console.log(counter.getValue()); // 2 or 12

// Reset to 0
counter.reset();
console.log(counter.getValue()); // 0

// Reset to custom value
counter.reset(50);
console.log(counter.getValue()); // 50
```

### API Reference

#### Constructor

```typescript
new Counter(initialValue?: number)
```

- **Parameters:**
  - `initialValue` (optional): The initial counter value. Defaults to 0.

#### Methods

##### getValue()

```typescript
getValue(): number
```

Returns the current counter value.

- **Returns:** `number` - The current value

##### increment()

```typescript
increment(amount?: number): number
```

Increments the counter by the specified amount.

- **Parameters:**
  - `amount` (optional): Amount to increment by. Defaults to 1.
- **Returns:** `number` - The new counter value
- **Throws:** `Error` if amount is not a finite number

##### decrement()

```typescript
decrement(amount?: number): number
```

Decrements the counter by the specified amount.

- **Parameters:**
  - `amount` (optional): Amount to decrement by. Defaults to 1.
- **Returns:** `number` - The new counter value
- **Throws:** `Error` if amount is not a finite number

##### reset()

```typescript
reset(value?: number): number
```

Resets the counter to the specified value.

- **Parameters:**
  - `value` (optional): Value to reset to. Defaults to 0.
- **Returns:** `number` - The new counter value
- **Throws:** `Error` if value is not a finite number

## Using the Counter Agent

### Basic Usage

```typescript
import { CounterAgent } from './src/agents/counter-agent.js';

// Create agent instance
const agent = new CounterAgent();

// Execute increment task
const result = await agent.execute({
  operation: 'increment',
  amount: 5
});

console.log(result);
// { success: true, value: 5, operation: 'increment' }
```

### Task Configuration

#### CounterTask Interface

```typescript
interface CounterTask {
  operation: 'increment' | 'decrement' | 'reset' | 'getValue';
  amount?: number;
  initialValue?: number;
}
```

#### CounterResult Interface

```typescript
interface CounterResult {
  success: boolean;
  value: number;
  operation: string;
  error?: string;
}
```

### Example Tasks

#### Increment Operation

```typescript
const task = {
  operation: 'increment',
  amount: 10  // optional, defaults to 1
};

const result = await agent.execute(task);
// { success: true, value: 10, operation: 'increment' }
```

#### Decrement Operation

```typescript
const task = {
  operation: 'decrement',
  amount: 3  // optional, defaults to 1
};

const result = await agent.execute(task);
// { success: true, value: 7, operation: 'decrement' }
```

#### Reset Operation

```typescript
const task = {
  operation: 'reset',
  initialValue: 0  // optional, defaults to 0
};

const result = await agent.execute(task);
// { success: true, value: 0, operation: 'reset' }
```

#### Get Value Operation

```typescript
const task = {
  operation: 'getValue'
};

const result = await agent.execute(task);
// { success: true, value: 0, operation: 'getValue' }
```

## Using the Orchestrator Runner

The orchestrator runner routes tasks to the appropriate agent.

### Basic Usage

```typescript
import { runner } from './src/orchestrator/runner.js';

// Execute a counter task
const result = await runner.executeTask({
  agentType: 'counter',
  payload: {
    operation: 'increment',
    amount: 5
  }
});

console.log(result);
// { success: true, value: 5, operation: 'increment' }
```

### Runner API

#### executeTask()

```typescript
executeTask(task: Task): Promise<any>
```

Executes a task by routing it to the appropriate agent.

- **Parameters:**
  - `task`: Task configuration with `agentType` and `payload`
- **Returns:** Promise resolving to the agent's result
- **Throws:** Error if agent type is unknown

#### getAvailableAgents()

```typescript
getAvailableAgents(): AgentType[]
```

Returns a list of available agent types.

```typescript
const agents = runner.getAvailableAgents();
console.log(agents); // ['counter']
```

#### resetAgents()

```typescript
resetAgents(): void
```

Resets all agent instances (clears cached instances).

```typescript
runner.resetAgents();
```

## Running Tests

### E2E Tests

The counter includes comprehensive Playwright E2E tests covering:

- ✅ Increment functionality (single and multiple clicks)
- ✅ Decrement functionality (single and multiple clicks)
- ✅ Reset functionality
- ✅ Edge cases (negative numbers, large numbers, zero crossing)
- ✅ Error handling
- ✅ State persistence
- ✅ Accessibility (ARIA labels, keyboard support)

#### Run E2E Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run tests in headed mode (visible browser)
npm run test:e2e -- --headed

# Run tests in debug mode
npm run test:e2e -- --debug

# Run specific test file
npm run test:e2e -- counter.spec.ts

# Run tests in a specific browser
npm run test:e2e -- --project=chromium
```

### Test Structure

Tests are organized into the following groups:

1. **Increment Functionality** - Tests various increment scenarios
2. **Decrement Functionality** - Tests various decrement scenarios
3. **Reset Functionality** - Tests reset from different states
4. **Mixed Operations** - Tests combinations of operations
5. **Edge Cases** - Tests boundary conditions and special cases
6. **UI and Accessibility** - Tests ARIA attributes and keyboard support
7. **Error Handling** - Tests error scenarios and recovery
8. **State Persistence** - Tests that state is maintained correctly

## Web UI

A demo UI is available at `/counter.html` that showcases the counter functionality.

### Features

- ✅ Clean, modern design
- ✅ Responsive layout
- ✅ Accessible with ARIA labels
- ✅ Keyboard shortcuts:
  - `+` or `=` - Increment
  - `-` - Decrement
  - `r` or `R` - Reset
- ✅ Visual feedback on button clicks
- ✅ Error message display

### Access the UI

```bash
# Start the development server
npm start

# Open in browser
http://localhost:3000/counter.html
```

## Troubleshooting

### Common Issues

#### Issue: Tests fail with "page.goto: net::ERR_CONNECTION_REFUSED"

**Solution:** Ensure the development server is running before running tests. Playwright will automatically start the server if configured, but if you see connection errors:

```bash
# Start server manually
npm start

# In another terminal, run tests
npm run test:e2e
```

#### Issue: TypeError: Cannot read property 'increment' of undefined

**Solution:** Ensure you've created a Counter instance:

```typescript
// Wrong
const value = increment();

// Correct
const counter = new Counter();
const value = counter.increment();
```

#### Issue: Error: Increment amount must be a finite number

**Solution:** Ensure you're passing valid numbers to increment/decrement:

```typescript
// Wrong
counter.increment(Infinity);
counter.increment(NaN);

// Correct
counter.increment(5);
counter.increment(-3); // This works, but consider using decrement instead
```

#### Issue: Agent not found in registry

**Solution:** Ensure you're using the correct agent type:

```typescript
// Wrong
await runner.executeTask({ agentType: 'count', payload: {...} });

// Correct
await runner.executeTask({ agentType: 'counter', payload: {...} });
```

### Debug Mode

For debugging issues, enable Playwright's debug mode:

```bash
npm run test:e2e -- --debug
```

This will:
- Open a browser with Playwright Inspector
- Allow you to step through tests
- Inspect page elements
- View console logs

### Verbose Logging

Enable verbose logging for the Counter utility:

```typescript
import { Counter } from './src/utils/counter.js';

const counter = new Counter(0);

// Log before and after operations
console.log('Before increment:', counter.getValue());
counter.increment(5);
console.log('After increment:', counter.getValue());
```

## Best Practices

### 1. Use TypeScript for Type Safety

```typescript
// Good: Types are checked at compile time
const counter: Counter = new Counter(10);
const value: number = counter.getValue();

// Avoid: No type checking
const counter = new Counter(10);
const value = counter.getValue();
```

### 2. Handle Errors Appropriately

```typescript
try {
  counter.increment(Infinity); // Will throw error
} catch (error) {
  console.error('Invalid operation:', error.message);
}
```

### 3. Use Agent Interface for Orchestration

```typescript
// Good: Using agent for orchestrated tasks
const result = await agent.execute({
  operation: 'increment',
  amount: 5
});
if (result.success) {
  console.log('New value:', result.value);
}

// Also good: Direct utility for simple use cases
const counter = new Counter();
counter.increment(5);
```

### 4. Test Isolation

Ensure each test is independent:

```typescript
test('should increment', async ({ page }) => {
  // Each test navigates to a fresh page
  await page.goto('/counter.html');
  // Test logic...
});
```

### 5. Use Descriptive Test Names

```typescript
// Good
test('should increment counter by 5 when increment button is clicked 5 times', ...);

// Avoid
test('test 1', ...);
```

## Examples

### Example 1: Simple Counter

```typescript
import { Counter } from './src/utils/counter.js';

const counter = new Counter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.decrement()); // 1
console.log(counter.reset());     // 0
```

### Example 2: Task-Based Execution

```typescript
import { runner } from './src/orchestrator/runner.js';

async function runCounterTasks() {
  // Increment
  let result = await runner.executeTask({
    agentType: 'counter',
    payload: { operation: 'increment', amount: 10 }
  });
  console.log('After increment:', result.value); // 10

  // Decrement
  result = await runner.executeTask({
    agentType: 'counter',
    payload: { operation: 'decrement', amount: 3 }
  });
  console.log('After decrement:', result.value); // 7

  // Reset
  result = await runner.executeTask({
    agentType: 'counter',
    payload: { operation: 'reset' }
  });
  console.log('After reset:', result.value); // 0
}

runCounterTasks();
```

### Example 3: Error Handling

```typescript
import { CounterAgent } from './src/agents/counter-agent.js';

const agent = new CounterAgent();

async function safeIncrement(amount: number) {
  const result = await agent.execute({
    operation: 'increment',
    amount
  });

  if (result.success) {
    console.log('Success! New value:', result.value);
  } else {
    console.error('Error:', result.error);
    console.log('Current value:', result.value);
  }
}

// This will succeed
await safeIncrement(5);

// This will fail with error
await safeIncrement(Infinity);
```

## Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Testing Best Practices](https://playwright.dev/docs/best-practices)

## Support

For issues or questions:
1. Check the Troubleshooting section above
2. Review test cases in `src/tests/counter.spec.ts` for usage examples
3. Open an issue in the repository

---

*Last updated: 2026-02-16*
