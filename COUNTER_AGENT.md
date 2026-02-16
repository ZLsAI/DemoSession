# Counter Agent

A TypeScript agent that implements increment and decrement counter logic following the BaseAgent pattern.

## Features

- **Increment Operation**: Add to the counter (default: +1)
- **Decrement Operation**: Subtract from the counter (default: -1)
- **Custom Amounts**: Support for custom increment/decrement amounts
- **State Persistence**: Counter state persists during agent lifecycle
- **Validation**: Comprehensive parameter validation and error handling
- **Type Safety**: Full TypeScript support with strict mode

## Installation

The Counter agent is built using TypeScript and requires Node.js with TypeScript support.

```bash
npm install
npm run build:ts
```

## Usage

### Basic Example

```typescript
import { CounterAgent } from './src/agents/counter-agent.js';
import type { CounterTask, Logger } from './src/config/types.js';

// Create a logger (or use your own logger implementation)
const logger: Logger = {
  info: (msg) => console.log(msg),
  error: (msg) => console.error(msg),
  warn: (msg) => console.warn(msg),
  debug: (msg) => console.debug(msg),
};

// Create a counter agent
const counterAgent = new CounterAgent(logger);

// Increment by 1 (default)
const result1 = await counterAgent.execute({
  id: 'task-1',
  type: 'counter',
  parameters: {
    operation: 'increment',
  },
});
// Result: count = 1

// Increment by 5
const result2 = await counterAgent.execute({
  id: 'task-2',
  type: 'counter',
  parameters: {
    operation: 'increment',
    amount: 5,
  },
});
// Result: count = 6

// Decrement by 2
const result3 = await counterAgent.execute({
  id: 'task-3',
  type: 'counter',
  parameters: {
    operation: 'decrement',
    amount: 2,
  },
});
// Result: count = 4

// Get current count
console.log(counterAgent.getCount()); // 4

// Reset counter
counterAgent.reset();
console.log(counterAgent.getCount()); // 0
```

## API

### CounterAgent

#### Constructor

```typescript
constructor(logger: Logger)
```

Creates a new Counter agent instance.

#### Methods

##### `execute(task: Task): Promise<TaskResult>`

Executes a counter task (increment or decrement).

**Task Parameters:**
- `operation`: `'increment' | 'decrement'` (required)
- `amount`: `number` (optional, default: 1, must be non-negative)

**Returns:**
- `TaskResult` object with:
  - `success`: boolean indicating if operation succeeded
  - `data`: object containing:
    - `count`: current count value
    - `previousCount`: count before the operation
    - `operation`: the operation performed
    - `amount`: the amount used
  - `message`: success message
  - `error`: error message (if failed)

##### `getCount(): number`

Returns the current count value.

##### `reset(): void`

Resets the counter to 0.

##### `getRole(): AgentRole`

Returns the agent's role (`'counter'`).

## Task Interface

```typescript
interface CounterTask extends Task {
  type: 'counter';
  parameters: {
    operation: 'increment' | 'decrement';
    amount?: number; // default: 1
  };
}
```

## Validation

The Counter agent validates:
- Task type must be `'counter'`
- Parameters object must be provided
- Operation must be `'increment'` or `'decrement'`
- Amount must be a non-negative number

Invalid inputs will return a `TaskResult` with `success: false` and an appropriate error message.

## Demo

Run the interactive demo to see all features:

```bash
npx tsx src/agents/counter-agent-demo.ts
```

## Testing

Unit tests are available in `src/tests/unit/counter-agent.test.ts` covering:
- Initialization
- Increment operations
- Decrement operations
- Validation
- State management
- Error handling

## Architecture

The Counter agent follows the BaseAgent pattern:
- Extends `BaseAgent` abstract class
- Implements the `execute()` method
- Uses dependency injection for logging
- Maintains internal state
- Returns standardized `TaskResult` objects

## TypeScript Configuration

The project uses:
- Target: ES2022
- Module: NodeNext (ESM with .js extensions)
- Strict mode enabled
- Source maps and declarations generated
