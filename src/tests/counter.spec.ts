import { test, expect } from '@playwright/test';

/**
 * E2E tests for Counter component
 * Tests increment, decrement, reset functionality and edge cases
 */

test.describe('Counter Component', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to counter page before each test
    await page.goto('/counter.html');
    // Wait for the counter to be visible
    await expect(page.getByTestId('counter-value')).toBeVisible();
  });

  test.describe('Increment Functionality', () => {
    test('should increment counter by 1 on single click', async ({ page }) => {
      const counterValue = page.getByTestId('counter-value');
      const incrementBtn = page.getByTestId('increment-btn');

      // Initial value should be 0
      await expect(counterValue).toHaveText('0');

      // Click increment button
      await incrementBtn.click();

      // Counter should be 1
      await expect(counterValue).toHaveText('1');
    });

    test('should increment counter multiple times', async ({ page }) => {
      const counterValue = page.getByTestId('counter-value');
      const incrementBtn = page.getByTestId('increment-btn');

      // Click increment button 5 times
      for (let i = 1; i <= 5; i++) {
        await incrementBtn.click();
        await expect(counterValue).toHaveText(i.toString());
      }
    });

    test('should handle rapid increment clicks', async ({ page }) => {
      const counterValue = page.getByTestId('counter-value');
      const incrementBtn = page.getByTestId('increment-btn');

      // Rapidly click increment 10 times
      for (let i = 0; i < 10; i++) {
        await incrementBtn.click();
      }

      // Counter should reach 10
      await expect(counterValue).toHaveText('10');
    });

    test('should increment to large positive numbers', async ({ page }) => {
      const counterValue = page.getByTestId('counter-value');
      const incrementBtn = page.getByTestId('increment-btn');

      // Click increment button 100 times
      for (let i = 0; i < 100; i++) {
        await incrementBtn.click();
      }

      // Counter should reach 100
      await expect(counterValue).toHaveText('100');
    });
  });

  test.describe('Decrement Functionality', () => {
    test('should decrement counter by 1 on single click', async ({ page }) => {
      const counterValue = page.getByTestId('counter-value');
      const decrementBtn = page.getByTestId('decrement-btn');

      // Initial value should be 0
      await expect(counterValue).toHaveText('0');

      // Click decrement button
      await decrementBtn.click();

      // Counter should be -1
      await expect(counterValue).toHaveText('-1');
    });

    test('should decrement counter multiple times', async ({ page }) => {
      const counterValue = page.getByTestId('counter-value');
      const decrementBtn = page.getByTestId('decrement-btn');

      // Click decrement button 5 times
      for (let i = 1; i <= 5; i++) {
        await decrementBtn.click();
        await expect(counterValue).toHaveText((-i).toString());
      }
    });

    test('should handle rapid decrement clicks', async ({ page }) => {
      const counterValue = page.getByTestId('counter-value');
      const decrementBtn = page.getByTestId('decrement-btn');

      // Rapidly click decrement 10 times
      for (let i = 0; i < 10; i++) {
        await decrementBtn.click();
      }

      // Counter should reach -10
      await expect(counterValue).toHaveText('-10');
    });

    test('should decrement to large negative numbers', async ({ page }) => {
      const counterValue = page.getByTestId('counter-value');
      const decrementBtn = page.getByTestId('decrement-btn');

      // Click decrement button 50 times
      for (let i = 0; i < 50; i++) {
        await decrementBtn.click();
      }

      // Counter should reach -50
      await expect(counterValue).toHaveText('-50');
    });
  });

  test.describe('Reset Functionality', () => {
    test('should reset counter to 0 from positive value', async ({ page }) => {
      const counterValue = page.getByTestId('counter-value');
      const incrementBtn = page.getByTestId('increment-btn');
      const resetBtn = page.getByTestId('reset-btn');

      // Increment to 10
      for (let i = 0; i < 10; i++) {
        await incrementBtn.click();
      }
      await expect(counterValue).toHaveText('10');

      // Reset
      await resetBtn.click();
      await expect(counterValue).toHaveText('0');
    });

    test('should reset counter to 0 from negative value', async ({ page }) => {
      const counterValue = page.getByTestId('counter-value');
      const decrementBtn = page.getByTestId('decrement-btn');
      const resetBtn = page.getByTestId('reset-btn');

      // Decrement to -10
      for (let i = 0; i < 10; i++) {
        await decrementBtn.click();
      }
      await expect(counterValue).toHaveText('-10');

      // Reset
      await resetBtn.click();
      await expect(counterValue).toHaveText('0');
    });

    test('should reset already zero counter', async ({ page }) => {
      const counterValue = page.getByTestId('counter-value');
      const resetBtn = page.getByTestId('reset-btn');

      // Counter starts at 0
      await expect(counterValue).toHaveText('0');

      // Reset
      await resetBtn.click();
      await expect(counterValue).toHaveText('0');
    });
  });

  test.describe('Mixed Operations', () => {
    test('should handle increment and decrement operations', async ({ page }) => {
      const counterValue = page.getByTestId('counter-value');
      const incrementBtn = page.getByTestId('increment-btn');
      const decrementBtn = page.getByTestId('decrement-btn');

      // Increment 5 times
      for (let i = 0; i < 5; i++) {
        await incrementBtn.click();
      }
      await expect(counterValue).toHaveText('5');

      // Decrement 3 times
      for (let i = 0; i < 3; i++) {
        await decrementBtn.click();
      }
      await expect(counterValue).toHaveText('2');
    });

    test('should maintain state across operations', async ({ page }) => {
      const counterValue = page.getByTestId('counter-value');
      const incrementBtn = page.getByTestId('increment-btn');
      const decrementBtn = page.getByTestId('decrement-btn');
      const resetBtn = page.getByTestId('reset-btn');

      // Complex sequence of operations
      await incrementBtn.click();
      await expect(counterValue).toHaveText('1');

      await incrementBtn.click();
      await expect(counterValue).toHaveText('2');

      await decrementBtn.click();
      await expect(counterValue).toHaveText('1');

      await resetBtn.click();
      await expect(counterValue).toHaveText('0');

      await decrementBtn.click();
      await expect(counterValue).toHaveText('-1');
    });
  });

  test.describe('Edge Cases', () => {
    test('should handle zero crossing from positive to negative', async ({ page }) => {
      const counterValue = page.getByTestId('counter-value');
      const incrementBtn = page.getByTestId('increment-btn');
      const decrementBtn = page.getByTestId('decrement-btn');

      // Go to 2
      await incrementBtn.click();
      await incrementBtn.click();
      await expect(counterValue).toHaveText('2');

      // Cross zero
      await decrementBtn.click();
      await expect(counterValue).toHaveText('1');
      await decrementBtn.click();
      await expect(counterValue).toHaveText('0');
      await decrementBtn.click();
      await expect(counterValue).toHaveText('-1');
    });

    test('should handle zero crossing from negative to positive', async ({ page }) => {
      const counterValue = page.getByTestId('counter-value');
      const incrementBtn = page.getByTestId('increment-btn');
      const decrementBtn = page.getByTestId('decrement-btn');

      // Go to -2
      await decrementBtn.click();
      await decrementBtn.click();
      await expect(counterValue).toHaveText('-2');

      // Cross zero
      await incrementBtn.click();
      await expect(counterValue).toHaveText('-1');
      await incrementBtn.click();
      await expect(counterValue).toHaveText('0');
      await incrementBtn.click();
      await expect(counterValue).toHaveText('1');
    });

    test('should display negative numbers correctly', async ({ page }) => {
      const counterValue = page.getByTestId('counter-value');
      const decrementBtn = page.getByTestId('decrement-btn');

      // Test various negative values
      const testValues = [-1, -10, -25, -100];
      
      for (const target of testValues) {
        // Reset to 0 first
        await page.reload();
        await expect(counterValue).toBeVisible();
        
        // Decrement to target
        for (let i = 0; i < Math.abs(target); i++) {
          await decrementBtn.click();
        }
        await expect(counterValue).toHaveText(target.toString());
      }
    });

    test('should display large positive numbers correctly', async ({ page }) => {
      const counterValue = page.getByTestId('counter-value');
      const incrementBtn = page.getByTestId('increment-btn');

      // Test large positive value
      for (let i = 0; i < 500; i++) {
        await incrementBtn.click();
      }
      await expect(counterValue).toHaveText('500');
    });
  });

  test.describe('UI and Accessibility', () => {
    test('should have proper ARIA labels on buttons', async ({ page }) => {
      const incrementBtn = page.getByTestId('increment-btn');
      const decrementBtn = page.getByTestId('decrement-btn');
      const resetBtn = page.getByTestId('reset-btn');

      // Check ARIA labels
      await expect(incrementBtn).toHaveAttribute('aria-label', 'Increment counter');
      await expect(decrementBtn).toHaveAttribute('aria-label', 'Decrement counter');
      await expect(resetBtn).toHaveAttribute('aria-label', 'Reset counter');
    });

    test('should have aria-live region for counter value', async ({ page }) => {
      const counterValue = page.getByTestId('counter-value');

      // Check aria-live attribute
      await expect(counterValue).toHaveAttribute('aria-live', 'polite');
    });

    test('should be keyboard accessible', async ({ page }) => {
      const counterValue = page.getByTestId('counter-value');

      // Test keyboard shortcuts
      await page.keyboard.press('+');
      await expect(counterValue).toHaveText('1');

      await page.keyboard.press('-');
      await expect(counterValue).toHaveText('0');

      await page.keyboard.press('+');
      await page.keyboard.press('+');
      await expect(counterValue).toHaveText('2');

      await page.keyboard.press('r');
      await expect(counterValue).toHaveText('0');
    });

    test('should display error messages when they occur', async ({ page }) => {
      const errorMessage = page.getByTestId('error-message');

      // Error message should exist and have aria-live
      await expect(errorMessage).toBeVisible();
      await expect(errorMessage).toHaveAttribute('aria-live', 'assertive');
    });
  });

  test.describe('Error Handling', () => {
    test('should clear error message after successful operation', async ({ page }) => {
      const counterValue = page.getByTestId('counter-value');
      const incrementBtn = page.getByTestId('increment-btn');
      const errorMessage = page.getByTestId('error-message');

      // Perform operation
      await incrementBtn.click();
      await expect(counterValue).toHaveText('1');

      // Error message should be empty
      await expect(errorMessage).toBeEmpty();
    });

    test('should maintain counter state after errors', async ({ page }) => {
      const counterValue = page.getByTestId('counter-value');
      const incrementBtn = page.getByTestId('increment-btn');

      // Increment multiple times
      for (let i = 0; i < 5; i++) {
        await incrementBtn.click();
      }
      await expect(counterValue).toHaveText('5');

      // State should be maintained
      await expect(counterValue).toHaveText('5');
    });
  });

  test.describe('State Persistence', () => {
    test('should maintain state during multiple operations', async ({ page }) => {
      const counterValue = page.getByTestId('counter-value');
      const incrementBtn = page.getByTestId('increment-btn');
      const decrementBtn = page.getByTestId('decrement-btn');

      // Perform various operations
      await incrementBtn.click();
      await incrementBtn.click();
      await incrementBtn.click();
      let currentValue = await counterValue.textContent();
      expect(currentValue).toBe('3');

      await decrementBtn.click();
      currentValue = await counterValue.textContent();
      expect(currentValue).toBe('2');

      // State should persist
      await expect(counterValue).toHaveText('2');
    });

    test('should not lose state on button hover', async ({ page }) => {
      const counterValue = page.getByTestId('counter-value');
      const incrementBtn = page.getByTestId('increment-btn');

      // Increment counter
      await incrementBtn.click();
      await expect(counterValue).toHaveText('1');

      // Hover over button
      await incrementBtn.hover();

      // State should remain
      await expect(counterValue).toHaveText('1');
    });
  });
});
