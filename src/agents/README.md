# Counter Agent Implementation

This directory contains the TypeScript-based agent system with a demonstration counter agent.

## Overview

The counter agent demonstrates simple state management with increment and decrement operations, serving as an educational example of how agents can maintain and manipulate state within the workflow orchestration system.

## Architecture

### Base Agent Pattern

All agents extend the `BaseAgent` abstract class which provides:
- Logging functionality via `ConsoleLogger`
- Configuration management via `AgentConfig`
- Abstract `execute()` method that must be implemented

### Type System

The agent system uses TypeScript with strict mode enabled and includes:
- `AgentConfig`: Base configuration for all agents
- `TaskResult`: Standard return type for agent operations
- `CounterOperation`: Type-safe operation definitions
- `CounterAgentConfig`: Counter-specific configuration

## Files

- **`base-agent.ts`**: Abstract base class for all agents
- **`counter-agent.ts`**: Counter agent implementation
- **`../config/types.ts`**: TypeScript type definitions

## Usage Example

```typescript
import { CounterAgent } from './agents/counter-agent.js';

// Create a counter with custom initial value
const counter = new CounterAgent({ 
  name: 'MyCounter',
  initialValue: 5 
});

// Use direct methods
console.log(counter.getValue()); // 5
counter.increment();              // 6
counter.decrement();              // 5
counter.reset();                  // Returns to 5

// Use execute() method for workflow integration
const result = await counter.execute({ operation: 'increment' });
console.log(result); 
// { success: true, data: 6, timestamp: Date }
```

## Features

### CounterAgent Methods

- **`increment()`**: Adds 1 to the counter
- **`decrement()`**: Subtracts 1 from the counter
- **`getValue()`**: Returns the current counter value
- **`reset()`**: Resets counter to its initial value
- **`execute(input)`**: Executes operations via input object

### Key Features

✓ **State Encapsulation**: Counter value stored as private property  
✓ **Type Safety**: Full TypeScript support with strict mode  
✓ **Error Handling**: Try-catch blocks with proper error messages  
✓ **Logging**: Built-in logger for all operations  
✓ **ES Modules**: Uses modern ESM syntax throughout  
✓ **JSDoc Documentation**: Comprehensive comments on all public APIs

## Building

```bash
# Compile TypeScript to JavaScript
npm run build:ts
```

Output is generated in the `dist/` directory with:
- JavaScript files (ESM format)
- TypeScript declaration files (.d.ts)
- Source maps (.map)

## Design Patterns

1. **Abstract Factory**: BaseAgent provides template for concrete agents
2. **Encapsulation**: Private state with public accessor methods
3. **Command Pattern**: execute() method accepts operation commands
4. **Template Method**: BaseAgent defines structure, subclasses implement details

## Technical Notes

- TypeScript target: ES2022
- Module system: NodeNext (ESM)
- All imports use `.js` extension (required for NodeNext)
- Package.json includes `"type": "module"` for ESM support
- Strict TypeScript mode enabled for maximum type safety
