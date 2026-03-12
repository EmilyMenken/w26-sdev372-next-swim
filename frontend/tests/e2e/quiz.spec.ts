import { test, expect } from "@playwright/test";

test.describe("Quiz Flow - Complete User Journey", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/resources"); 
    await expect(page.locator("h1:has-text('Swim Level Analysis')")).toBeVisible();
  });

  test("should complete quiz with advanced level and see expert recommendations", async ({ page }) => {
    const selects = page.locator('select.quiz-select');
    await selects.nth(0).selectOption("Advanced");
    await selects.nth(1).selectOption("Confident");
    await selects.nth(2).selectOption("Water-based");
    await selects.nth(3).selectOption("Yes");    // Breathing
    await selects.nth(4).selectOption("Strong"); // Kicking
    await selects.nth(5).selectOption("Long");   // Endurance

    await page.locator('button.quiz-button').click();

    // Wait for the results state to render
    const resultsHeader = page.getByRole('heading', { name: 'NextSwim Analysis' });
    await expect(resultsHeader).toBeVisible({ timeout: 10000 });
    
    // Based on your logic: Advanced + Breathing/Kicking/Endurance = Proficient
    await expect(page.locator("text=Swim Level: Proficient")).toBeVisible();
  });

  test("should allow user to retake the quiz after submitting", async ({ page }) => {
    // Fill all fields to reach results
    const selects = page.locator('select.quiz-select');
    for (let i = 0; i < 6; i++) {
      await selects.nth(i).selectOption({ index: 1 });
    }
    await page.locator('button.quiz-button').click();
    
    // Click retake and verify we are back at the start
    await page.locator('button:has-text("Retake Quiz")').click();
    await expect(page.locator("h1:has-text('Swim Level Analysis')")).toBeVisible();
  });
});