// Создать тест сьют используя DDT подход с негативными тест-кейсами по регистрации на сайте
// https://anatoly-karpovich.github.io/demo-login-form/

// Требования:
// Страница регистрации:
//   Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
//   Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен

// Страница логина:
//   Username: обязательное
//   Password: обязательное

import { test, expect } from "@playwright/test";
import { registerTestData, loginTestData } from "./testdata";

test.describe("[Anatoly-Karpovich] [Register Form]", () => {
  test.beforeEach("Open Login Page", async ({ page }) => {
    const loginPageUrl = "https://anatoly-karpovich.github.io/demo-login-form/";
    await page.goto(loginPageUrl);
    await expect(page.locator(".loginForm")).toBeVisible();
    await page.locator("#registerOnLogin").click();
  });

  test("Register Form Fields", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 2 })).toHaveText("Registration");
    await expect(page.locator("#userNameOnRegister")).toBeVisible();
    await expect(page.locator("#passwordOnRegister")).toBeVisible();
    await expect(page.locator("#register")).toBeVisible();
    await expect(page.locator("#backOnRegister")).toBeVisible();
  });

  for (const { title, credentials, message } of registerTestData) {
    test(title, async ({ page }) => {
      const { username, password } = credentials;
      await page.locator("#userNameOnRegister").fill(username);
      await page.locator("#passwordOnRegister").fill(password);
      await page.locator("#register").click();
      await expect(page.locator("#errorMessageOnRegister")).toHaveText(message);
    });
  }
});

test.describe("[Anatoly-Karpovich] [Login Form]", () => {
  test.beforeEach("Open Login Page", async ({ page }) => {
    const loginPageUrl = "https://anatoly-karpovich.github.io/demo-login-form/";
    await page.goto(loginPageUrl);
    await expect(page.locator(".loginForm")).toBeVisible();
  });

  for (const { title, credentials, message } of loginTestData) {
    test(title, async ({ page }) => {
      const { username, password } = credentials;
      await page.locator("#userName").fill(username);
      await page.locator("#password").fill(password);
      await page.locator("#submit").click();
      await expect(page.locator("#errorMessage")).toHaveText(message);
    });
  }
});
