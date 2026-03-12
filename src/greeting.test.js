import { greet } from './greeting';

describe('greet', () => {
  it('returns "Hello, World!" when called with no arguments', () => {
    expect(greet()).toBe('Hello, World!');
  });

  it('returns a greeting with the provided name', () => {
    expect(greet('Alice')).toBe('Hello, Alice!');
  });

  it('returns a greeting for any given name', () => {
    expect(greet('React')).toBe('Hello, React!');
  });
});
