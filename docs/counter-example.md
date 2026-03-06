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
const scoreAgent = new CounterAgent({ name: 'ScoreTracker', initialValue: 0 });

// Player scores points
await scoreAgent.execute({ operation: 'increment', amount: 10 });
await scoreAgent.execute({ operation: 'increment', amount: 25 });

// Player loses points
await scoreAgent.execute({ operation: 'decrement', amount: 5 });

const score = await scoreAgent.execute({ operation: 'getValue' });
console.log(`Current score: ${score.data.value}`); // 30
```

### 3. Resource Tracking

Track available resources:

```typescript
const resourceAgent = new CounterAgent({ name: 'ResourcePool', initialValue: 100 });

// Consume resources
await resourceAgent.execute({ operation: 'decrement', amount: 30 });

// Check remaining
const remaining = await resourceAgent.execute({ operation: 'getValue' });
console.log(`Resources remaining: ${remaining.data.value}`); // 70

// Replenish
await resourceAgent.execute({ operation: 'reset', value: 100 });
```

## Testing

The counter agent includes a comprehensive Playwright test suite at `src/tests/counter.spec.ts`.

### Running Tests

```bash
npx playwright test src/tests/counter.spec.ts
```

### Test Coverage

The test suite covers:
- Default initialization (value = 0)
- Custom initial values
- Increment by default amount (1)
- Increment by custom amount
- Decrement by default amount (1)
- Decrement by custom amount
- Get value operation
- Reset to default (0)
- Reset to custom value
- Agent name retrieval
- Sequential operation chains
- Negative counter values
