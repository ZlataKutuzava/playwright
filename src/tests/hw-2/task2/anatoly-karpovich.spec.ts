// Разработать тест со следующими шагами:
//   - открыть https://anatoly-karpovich.github.io/demo-login-form/
//   - Засунуть в localStorage браузера данные test@gmail.com / SecretPw123!@# для логина на сайт
//   - Залогиниться с данными что вы вставили в localStorage
//   - Завалидировать успешный логин

//   Рекоммендации:
//   - Для доступа к localStorage используйте https://playwright.dev/docs/evaluating

import test, { expect } from "@playwright/test";

test.describe("[Anatoly-Karpovich] [Login Form]", () => {
  test("Login Page Form", async ({ page }) => {
    interface ICredentials {
      username: string;
      password: string;
    }
    const creds: ICredentials = {
      username: "test@gmail.com",
      password: "SecretPw123!@#"
    };
    const loginPageUrl = "https://anatoly-karpovich.github.io/demo-login-form/";
    await page.goto(loginPageUrl);
    await page.evaluate(
      ({ username, password }) => {
        localStorage.setItem(username, JSON.stringify({ name: username, password: password }));
      },
      {
        username: creds.username,
        password: creds.password
      }
    );
    await expect(page.locator(".loginForm")).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Login" })).toBeVisible();
    await page.locator("#userName").fill(creds.username);
    await page.locator("#password").fill(creds.password);
    await page.locator("#submit").click();
    await expect(page.locator("#successMessage")).toHaveText(`Hello, ${creds.username}!`);
    await expect(page.locator("#backButton")).toHaveAttribute("value", "Back to login page");
  });
});
