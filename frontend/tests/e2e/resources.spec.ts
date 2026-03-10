import { test, expect } from "@playwright/test";

test.describe("Resources Flow - Add and Manage Resources", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1:has-text('Aquatic Resources')")).toBeVisible();
  });

  test("should successfully add a new resource and verify it appears in the list", async ({ page }) => {
    const timestamp = Date.now();
    const resourceTitle = `Test Resource ${timestamp}`;
    const difficulty = "2";

    const addResourceSection = page.locator("h2:has-text('Add New Resource')");
    await addResourceSection.scrollIntoViewIfNeeded();

    await page.locator('input[placeholder="Resource Title"]').fill(resourceTitle);
    await page.locator('select.form-input').selectOption("Article");
    await page.locator('input[type="number"]').fill(difficulty);
    await page.locator('textarea[placeholder="Description"]').fill("Automated test description");
    await page.locator('input[placeholder="URL (https://...)"]').fill("https://example.com/test");

    // Handle the success alert
    const [alert] = await Promise.all([
      page.waitForEvent("dialog"),
      page.locator('button.submit-btn').click()
    ]);
    await alert.accept();

    // Expand the Level group to verify the item is visible
    const levelGroup = page.locator('details.resource-level-group').filter({ hasText: `Level ${difficulty}` });
    await levelGroup.locator('summary').click(); 

    const newEntry = levelGroup.locator('.resource-item').filter({ hasText: resourceTitle });
    await expect(newEntry).toBeVisible();
  });

  test("should display all required fields in the add resource form", async ({ page }) => {
    const form = page.locator(".add-resource-form");
    await form.scrollIntoViewIfNeeded();
    await expect(page.locator('input[placeholder="Resource Title"]')).toBeVisible();
    await expect(page.locator('select.form-input')).toBeVisible();
    await expect(page.locator('input[type="number"]')).toHaveAttribute("max", "4");
  });

  test("should display resources grouped by difficulty level", async ({ page }) => {
    const levelGroups = page.locator("details.resource-level-group");
    await expect(levelGroups.first()).toBeVisible();
  });

  test("should expand and collapse resource level groups", async ({ page }) => {
    const group = page.locator("details.resource-level-group").first();
    const summary = group.locator("summary");
    await summary.click();
    await expect(group).toHaveAttribute("open", "");
  });

  test("should open resource links in new tab", async ({ page }) => {
    const firstLink = page.locator("a.resource-link").first();
    if (await firstLink.count() > 0) {
        await expect(firstLink).toHaveAttribute("target", "_blank");
        await expect(firstLink).toHaveAttribute("rel", "noopener noreferrer");
    }
  });
});