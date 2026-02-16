# Counter Agent Example

## Overview

The Counter Agent is a simple yet comprehensive example that demonstrates state management in workflow agents. It serves as an educational reference for understanding how agents work within the workflow system, showcasing best practices for implementing stateful operations.

## Purpose

This example illustrates:
- **State Management**: How agents maintain and modify internal state across operations
- **Agent Pattern**: Implementation of the BaseAgent interface for consistent agent behavior
- **Error Handling**: Robust validation and error recovery
- **API Design**: Clean, intuitive API for agent operations

## Quick Start

### Installation

Ensure you have the required dependencies:

```bash
npm install
npm install --save-dev typescript @playwright/test
```

### Basic Usage

```typescript
import { CounterAgent } from './agents/counter-agent.js';

// Create a new counter agent
const agent = new CounterAgent();

// Increment the counter
const result1 = await agent.execute({ operation: 'increment' });
console.log(result1.data.value); // Output: 1

// Increment by a custom amount
const result2 = await agent.execute({ operation: 'increment', amount: 5 });
console.log(result2.data.value); // Output: 6

// Get current value
const result3 = await agent.execute({ operation: 'getValue' });
console.log(result3.data.value); // Output: 6

// Decrement
const result4 = await agent.execute({ operation: 'decrement', amount: 2 });
console.log(result4.data.value); // Output: 4

// Reset to zero
const result5 = await agent.execute({ operation: 'reset' });
console.log(result5.data.value); // Output: 0
```

## Architecture

### Class Hierarchy

```
BaseAgent (Abstract)
    ↓
CounterAgent (Concrete Implementation)
    ↓
Counter (Utility Class)
```

### Files Structure

- **`src/agents/base-agent.ts`** - Abstract base class defining the agent interface
- **`src/agents/counter-agent.ts`** - Counter agent implementation
- **`src/utils/counter.ts`** - Counter utility class with core logic
- **`src/tests/counter.spec.ts`** - Comprehensive Playwright test suite

## API Documentation

### CounterAgent Class

#### Constructor

```typescript
new CounterAgent()
```

Creates a new counter agent with an initial value of 0.

**Example:**
```typescript
const agent = new CounterAgent();
```

#### Methods

##### `execute(input: CounterInput): Promise<TaskResult>`

Executes a counter operation based on the provided input.

**Parameters:**
- `input` - Counter operation input object

**Returns:** Promise resolving to a TaskResult

**Example:**
```typescript
const result = await agent.execute({ 
  operation: 'increment',
  amount: 3 
});
```

##### `getName(): string`

Returns the name of the agent.

**Returns:** `"CounterAgent"`

**Example:**
```typescript
const name = agent.getName(); // "CounterAgent"
```

##### `getCurrentValue(): number`

Convenience method to get the current counter value directly.

**Returns:** Current counter value as a number

**Example:**
```typescript
const value = agent.getCurrentValue(); // e.g., 5
```

##### `resetCounter(value?: number): void`

Convenience method to reset the counter to a specified value.

**Parameters:**
- `value` - Value to reset to (default: 0)

**Example:**
```typescript
agent.resetCounter(10); // Reset to 10
agent.resetCounter();    // Reset to 0
```

### Operations

#### Increment

Increases the counter value by a specified amount.

**Input:**
```typescript
{
  operation: 'increment',
  amount?: number  // default: 1
}
```

**Example:**
```typescript
// Increment by 1 (default)
await agent.execute({ operation: 'increment' });

// Increment by 5
await agent.execute({ operation: 'increment', amount: 5 });
```

#### Decrement

Decreases the counter value by a specified amount. The counter can go below zero.

**Input:**
```typescript
{
  operation: 'decrement',
  amount?: number  // default: 1
}
```

**Example:**
```typescript
// Decrement by 1 (default)
await agent.execute({ operation: 'decrement' });

// Decrement by 3
await agent.execute({ operation: 'decrement', amount: 3 });
```

#### Get Value

Retrieves the current counter value without modifying it.

**Input:**
```typescript
{
  operation: 'getValue'
}
```

**Example:**
```typescript
const result = await agent.execute({ operation: 'getValue' });
console.log(result.data.value);
```

#### Reset

Resets the counter to a specified value (default: 0).

**Input:**
```typescript
{
  operation: 'reset',
  value?: number  // default: 0
}
```

**Example:**
```typescript
// Reset to 0 (default)
await agent.execute({ operation: 'reset' });

// Reset to 10
await agent.execute({ operation: 'reset', value: 10 });
```

### TaskResult Interface

All operations return a `TaskResult` object:

```typescript
interface TaskResult {
  success: boolean;   // Whether the operation succeeded
  message: string;    // Human-readable message describing the result
  data?: any;        // Operation-specific data (includes 'value' for counter)
}
```

**Success Example:**
```typescript
{
  success: true,
  message: "Counter incremented by 1 to 5",
  data: { value: 5 }
}
```

**Error Example:**
```typescript
{
  success: false,
  message: "Invalid operation. Must be one of: increment, decrement, getValue, reset",
  data: { value: 0 }
}
```

## Use Cases

### 1. Simple Counter

Track a count of events or occurrences:

```typescript
const agent = new CounterAgent();

// Record events
await agent.execute({ operation: 'increment' }); // Event 1
await agent.execute({ operation: 'increment' }); // Event 2
await agent.execute({ operation: 'increment' }); // Event 3

// Check count
const result = await agent.execute({ operation: 'getValue' });
console.log(`Total events: ${result.data.value}`); // Total events: 3
```

### 2. Score Tracking

Track scores in a game or application:

```typescript
const scoreAgent = new CounterAgent();

// Player scores points
await scoreAgent.execute({ operation: 'increment', amount: 10 });
await scoreAgent.execute({ operation: 'increment', amount: 25 });

// Player loses points
await scoreAgent.execute({ operation: 'decrement', amount: 5 });

// Check final score
const result = await scoreAgent.execute({ operation: 'getValue' });
console.log(`Final score: ${result.data.value}`); // Final score: 30
```

### 3. Inventory Management

Track inventory levels:

```typescript
const inventoryAgent = new CounterAgent();

// Set initial stock
await inventoryAgent.execute({ operation: 'reset', value: 100 });

// Items sold
await inventoryAgent.execute({ operation: 'decrement', amount: 15 });

// Items restocked
await inventoryAgent.execute({ operation: 'increment', amount: 50 });

// Check current inventory
const result = await inventoryAgent.execute({ operation: 'getValue' });
console.log(`Items in stock: ${result.data.value}`); // Items in stock: 135
```

### 4. Workflow Step Tracking

Track progress through a workflow:

```typescript
const stepAgent = new CounterAgent();

// Start at step 1
await stepAgent.execute({ operation: 'reset', value: 1 });

// Move to next steps
await stepAgent.execute({ operation: 'increment' }); // Step 2
await stepAgent.execute({ operation: 'increment' }); // Step 3

// Go back a step
await stepAgent.execute({ operation: 'decrement' }); // Back to Step 2

// Check current step
const result = await stepAgent.execute({ operation: 'getValue' });
console.log(`Current step: ${result.data.value}`); // Current step: 2
```

## Integration with Workflow System

The Counter Agent integrates seamlessly with the workflow system:

### BaseAgent Pattern

All agents in the workflow system extend the `BaseAgent` abstract class:

```typescript
export abstract class BaseAgent {
  protected name: string;
  
  constructor(name: string) {
    this.name = name;
  }
  
  getName(): string {
    return this.name;
  }
  
  abstract execute(input: any): Promise<TaskResult>;
}
```

The CounterAgent implements this pattern:

```typescript
export class CounterAgent extends BaseAgent {
  constructor() {
    super('CounterAgent');
    // ...
  }
  
  async execute(input: CounterInput): Promise<TaskResult> {
    // Implementation
  }
}
```

### Error Handling

The Counter Agent demonstrates robust error handling:

1. **Input Validation**: Validates operation type and parameters
2. **Type Checking**: Ensures amounts and values are numbers
3. **Graceful Failures**: Returns error TaskResult instead of throwing exceptions
4. **State Preservation**: Maintains counter state even when operations fail

```typescript
// Example of error handling
const result = await agent.execute({ operation: 'invalid' });
console.log(result.success); // false
console.log(result.message); // "Invalid operation. Must be one of: ..."
console.log(result.data.value); // Current value preserved
```

### Testing

The Counter Agent includes comprehensive Playwright tests covering:

- All operations (increment, decrement, getValue, reset)
- Edge cases (negative values, large numbers, decimals)
- Error conditions (invalid inputs, type errors)
- BaseAgent interface compliance
- State management across operations

Run tests with:

```bash
npm test
```

## Best Practices

### 1. Use Type-Safe Inputs

Always use properly typed inputs:

```typescript
// Good
const input: CounterInput = { operation: 'increment', amount: 5 };
await agent.execute(input);

// Avoid
await agent.execute({ operation: 'invalid' }); // Will fail validation
```

### 2. Handle Results

Always check the success flag:

```typescript
const result = await agent.execute({ operation: 'increment' });

if (result.success) {
  console.log(`Counter is now: ${result.data.value}`);
} else {
  console.error(`Error: ${result.message}`);
}
```

### 3. Use Convenience Methods

For simple operations, use convenience methods:

```typescript
// Direct access
const currentValue = agent.getCurrentValue();

// Reset quickly
agent.resetCounter(0);
```

### 4. Maintain Single Responsibility

Each agent instance maintains its own state. For multiple counters, create multiple instances:

```typescript
const userCounter = new CounterAgent();
const itemCounter = new CounterAgent();

await userCounter.execute({ operation: 'increment' });
await itemCounter.execute({ operation: 'increment', amount: 5 });

// Each maintains separate state
console.log(userCounter.getCurrentValue()); // 1
console.log(itemCounter.getCurrentValue()); // 5
```

## Advanced Topics

### Extending the Counter Agent

You can extend the CounterAgent for specialized behavior:

```typescript
export class LimitedCounterAgent extends CounterAgent {
  private max: number;
  
  constructor(max: number) {
    super();
    this.max = max;
  }
  
  async execute(input: CounterInput): Promise<TaskResult> {
    const result = await super.execute(input);
    
    if (result.success && result.data.value > this.max) {
      // Handle max limit
      this.resetCounter(this.max);
      return {
        success: true,
        message: `Counter limited to maximum: ${this.max}`,
        data: { value: this.max }
      };
    }
    
    return result;
  }
}
```

### Custom Operations

Add custom operations by extending the agent:

```typescript
export class EnhancedCounterAgent extends CounterAgent {
  async execute(input: any): Promise<TaskResult> {
    if (input.operation === 'double') {
      const current = this.getCurrentValue();
      await super.execute({ operation: 'reset', value: current * 2 });
      return {
        success: true,
        message: `Counter doubled to ${current * 2}`,
        data: { value: current * 2 }
      };
    }
    
    return super.execute(input);
  }
}
```

## Troubleshooting

### Common Issues

**Issue**: Import errors with `.js` extension
```typescript
// Correct
import { CounterAgent } from './agents/counter-agent.js';

// Wrong
import { CounterAgent } from './agents/counter-agent';
```

**Solution**: Always use `.js` extension in imports when using NodeNext module resolution.

---

**Issue**: Tests failing with module resolution errors

**Solution**: Ensure `tsconfig.json` has correct module settings:
```json
{
  "compilerOptions": {
    "module": "NodeNext",
    "moduleResolution": "NodeNext"
  }
}
```

---

**Issue**: Counter state persisting between tests

**Solution**: Create a new agent instance for each test:
```typescript
test('should increment', async () => {
  const agent = new CounterAgent(); // New instance
  // test code
});
```

## Further Reading

- [Playwright Documentation](https://playwright.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Agent Pattern Design](https://en.wikipedia.org/wiki/Software_agent)

## Contributing

When extending this example:
1. Follow the BaseAgent interface
2. Add comprehensive tests
3. Update this documentation
4. Maintain backward compatibility

## License

This example is part of the DemoSession project.
