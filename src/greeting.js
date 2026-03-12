/**
 * Returns a greeting message for the given name.
 * @param {string} name - The name to greet (defaults to 'World')
 * @returns {string} The greeting message
 */
export function greet(name = 'World') {
  return `Hello, ${name}!`;
}
