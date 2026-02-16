/**
 * Counter Application
 * Implements interactive counter with increment/decrement functionality
 * and immediate visual feedback
 */

// Initialize counter state
let count = 0;

// DOM element references (will be set when DOM loads)
let counterDisplay = null;
let incrementButton = null;
let decrementButton = null;

/**
 * Updates the counter display in the DOM
 */
function updateDisplay() {
  if (counterDisplay) {
    counterDisplay.textContent = count;
    
    // Add animation class for visual feedback
    counterDisplay.classList.add('animate');
    
    // Remove animation class after animation completes
    setTimeout(() => {
      counterDisplay.classList.remove('animate');
    }, 300);
  }
}

/**
 * Handles increment button click
 * Increases counter by 1
 */
function handleIncrement() {
  count++;
  updateDisplay();
  console.log(`Counter incremented to: ${count}`);
}

/**
 * Handles decrement button click
 * Decreases counter by 1
 * Optional: Prevents going below 0 (can be modified for different behavior)
 */
function handleDecrement() {
  // Optional: Uncomment to prevent negative values
  // if (count > 0) {
  //   count--;
  //   updateDisplay();
  // }
  
  // Default: Allow negative values
  count--;
  updateDisplay();
  console.log(`Counter decremented to: ${count}`);
}

/**
 * Initializes the counter application
 * Sets up event listeners and initial state
 */
function initCounter() {
  // Get DOM elements
  counterDisplay = document.getElementById('counter-display');
  incrementButton = document.getElementById('increment-btn');
  decrementButton = document.getElementById('decrement-btn');
  
  // Validate that all required elements exist
  if (!counterDisplay || !incrementButton || !decrementButton) {
    console.error('Counter initialization failed: Required DOM elements not found');
    console.error('Expected elements: #counter-display, #increment-btn, #decrement-btn');
    return;
  }
  
  // Set initial display value
  updateDisplay();
  
  // Add event listeners for click events
  incrementButton.addEventListener('click', handleIncrement);
  decrementButton.addEventListener('click', handleDecrement);
  
  // Add keyboard support (Enter and Space)
  incrementButton.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleIncrement();
    }
  });
  
  decrementButton.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleDecrement();
    }
  });
  
  console.log('Counter initialized successfully');
}

// Initialize when DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCounter);
} else {
  // DOM is already loaded
  initCounter();
}

// Optional: Expose functions for testing or external access
if (typeof window !== 'undefined') {
  window.counterApp = {
    getCount: () => count,
    setCount: (newCount) => {
      count = newCount;
      updateDisplay();
    },
    increment: handleIncrement,
    decrement: handleDecrement
  };
}
