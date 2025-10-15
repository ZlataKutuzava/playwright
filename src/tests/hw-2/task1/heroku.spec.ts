// Разработать тест со следующими шагами:
//   - открыть https://the-internet.herokuapp.com/
//   - перейти на страницу Dynamic Controls
//   - Дождаться появления кнопки Remove
//   - Завалидировать текста в заголовке страницы
//   - Чекнуть чекбокс
//   - Кликнуть по кнопке Remove
//   - Дождаться исчезновения чекбокса
//   - Проверить наличие кнопки Add
//   - Завалидировать текст It's gone!
//   - Кликнуть на кнопку Add
//   - Дождаться появления чекбокса
//   - Завалидировать текст It's back!

import { test, expect } from "@playwright/test";

test.describe("[Heroku] [Dynamic Controls]", () => {
  test.beforeEach("Open Main Page", async ({ page }) => {
    const homePageUrl = "https://the-internet.herokuapp.com/";
    await page.goto(homePageUrl);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Welcome to the-internet");
  });

  test("Dynamic Controls Page", async ({ page }) => {
    const dynamicControlsLink = page.locator("//a[@href='/dynamic_controls']");
    const removeButton = page.locator("//button[text()='Remove']");
    const checkboxInput = page.locator("//input[@type='checkbox']");
    const addButton = page.locator("//button[text()='Add']");
    const messageString = page.locator("p#message");
    const dynamicControlsPageTitle = page.getByText("Dynamic Controls");
    const removeAddTitle = page.getByText("Remove/add");
    await dynamicControlsLink.click();
    await expect(dynamicControlsPageTitle).toHaveText("Dynamic Controls");
    await expect(removeAddTitle).toHaveText("Remove/add");
    await expect(removeButton).toBeVisible();
    await checkboxInput.check();
    await removeButton.click();
    await checkboxInput.waitFor({ state: "detached" });
    await expect(addButton).toBeVisible();
    await expect(messageString).toHaveText("It's gone!");
    await addButton.click();
    await expect(checkboxInput).toBeVisible();
    await expect(messageString).toHaveText("It's back!");
  });
});
