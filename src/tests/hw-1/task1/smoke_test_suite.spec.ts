//Разработайте смоук тест-сьют с тестами на REGISTER на странице
// https://anatoly-karpovich.github.io/demo-login-form/
//   Требования:
//     Страница регистрации:
//       Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
//       Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен
//     Страница логина:
//       Username: обязательное
//       Password: обязательное

import { test, expect } from "@playwright/test";

enum MESSAGES {
  LOGIN_FAILED = "Credentials are required",
  REGISTER_FAILED = "Please, provide valid data",
  REGISTER_SUCCESS = "Successfully registered! Please, click Back to return on login page",
  SHORT_USERNAME = "Username should contain at least 3 characters",
  SHORT_PASSWORD = "Password should contain at least 8 characters",
  EMPTY_PASSWORD = "Password is required",
  EMPTY_USERNAME = "Username is required",
  PREFIX_POSTFIX_SPACES_USERNAME = "Prefix and postfix spaces are not allowed is username",
  PASSWORD_NO_LOWERCASE = "Password should contain at least one character in lower case"
}

interface ICredentials {
  username: string;
  password: string;
}

const credentials: ICredentials[] = [
  {
    username: "Zlata",
    password: "Bubarexa97"
  },
  {
    username: "",
    password: "Bubarexa97"
  },
  {
    username: "Zlata",
    password: ""
  },
  {
    username: "97",
    password: "Bubarexa97"
  },
  {
    username: "Zlata",
    password: "Bubarex"
  },
  {
    username: " prefix_space",
    password: "Bubarexa97"
  },
  {
    username: "postfix_space ",
    password: "Bubarexa97"
  },
  {
    username: "    ",
    password: "OnlySpaces111"
  },
  {
    username: "1234567890123456789012345678901234567890",
    password: "Username.length40"
  },
  {
    username: "password_length_is_20",
    password: "_Password_length_20_"
  },
  {
    username: "password_only_spaces",
    password: "     "
  },
  {
    username: "password_capslock",
    password: "ALLCAPSLETTERS"
  }
];

test.describe("[Anatoly-Karpovich] [Login Form]", () => {
  test.beforeEach("Open Login Page", async ({ page }) => {
    const loginPageUrl = "https://anatoly-karpovich.github.io/demo-login-form/";
    await page.goto(loginPageUrl);
    await expect(page.locator(".loginForm")).toBeVisible();
  });

  test("Login Page Form", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 2, name: "Login" })).toBeVisible();
    await expect(page.locator("#userName")).toBeVisible();
    await expect(page.locator("#password")).toBeVisible();
    await expect(page.locator(".buttonWrapper span")).toHaveText("OR");
    await expect(page.locator("#submit")).toBeVisible();
    await expect(page.locator("#registerOnLogin")).toBeVisible();
  });

  test("Username and password are required fields", async ({ page }) => {
    await page.locator("#submit").click();
    await expect(page.locator("#errorMessage")).toHaveText(MESSAGES.LOGIN_FAILED);
  });
});

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

  test("Register with empty username and password fields", async ({ page }) => {
    await page.locator("#register").click();
    await expect(page.locator("#errorMessageOnRegister")).toHaveText(MESSAGES.REGISTER_FAILED);
  });

  test("Register with valid credentials", async ({ page }) => {
    await page.locator("#userNameOnRegister").fill(credentials[0].username);
    await page.locator("#passwordOnRegister").fill(credentials[0].password);
    await page.locator("#register").click();
    await expect(page.locator("#errorMessageOnRegister")).toHaveText(MESSAGES.REGISTER_SUCCESS);
  });

  test("Register with empty username and valid password", async ({ page }) => {
    await page.locator("#userNameOnRegister").fill(credentials[1].username);
    await page.locator("#passwordOnRegister").fill(credentials[1].password);
    await page.locator("#register").click();
    await expect(page.locator("#errorMessageOnRegister")).toHaveText(MESSAGES.EMPTY_USERNAME);
  });

  test("Register with empty password and valid username", async ({ page }) => {
    await page.locator("#userNameOnRegister").fill(credentials[2].username);
    await page.locator("#passwordOnRegister").fill(credentials[2].password);
    await page.locator("#register").click();
    await expect(page.locator("#errorMessageOnRegister")).toHaveText(MESSAGES.EMPTY_PASSWORD);
  });

  test("Register with username.length < 3 and valid password", async ({ page }) => {
    await page.locator("#userNameOnRegister").fill(credentials[3].username);
    await page.locator("#passwordOnRegister").fill(credentials[3].password);
    await page.locator("#register").click();
    await expect(page.locator("#errorMessageOnRegister")).toHaveText(MESSAGES.SHORT_USERNAME);
  });

  test("Register with valid username and password.length < 8", async ({ page }) => {
    await page.locator("#userNameOnRegister").fill(credentials[4].username);
    await page.locator("#passwordOnRegister").fill(credentials[4].password);
    await page.locator("#register").click();
    await expect(page.locator("#errorMessageOnRegister")).toHaveText(MESSAGES.SHORT_PASSWORD);
  });

  test("Register with valid password and username with prefix spaces", async ({ page }) => {
    await page.locator("#userNameOnRegister").fill(credentials[5].username);
    await page.locator("#passwordOnRegister").fill(credentials[5].password);
    await page.locator("#register").click();
    await expect(page.locator("#errorMessageOnRegister")).toHaveText(MESSAGES.PREFIX_POSTFIX_SPACES_USERNAME);
  });

  test("Register with valid password and username with postfix spaces", async ({ page }) => {
    await page.locator("#userNameOnRegister").fill(credentials[6].username);
    await page.locator("#passwordOnRegister").fill(credentials[6].password);
    await page.locator("#register").click();
    await expect(page.locator("#errorMessageOnRegister")).toHaveText(MESSAGES.PREFIX_POSTFIX_SPACES_USERNAME);
  });

  test("Register with valid password and username, containing only spaces", async ({ page }) => {
    await page.locator("#userNameOnRegister").fill(credentials[7].username);
    await page.locator("#passwordOnRegister").fill(credentials[7].password);
    await page.locator("#register").click();
    await expect(page.locator("#errorMessageOnRegister")).toHaveText(MESSAGES.PREFIX_POSTFIX_SPACES_USERNAME);
  });

  test("Register with valid password and username.length = 40", async ({ page }) => {
    await page.locator("#userNameOnRegister").fill(credentials[8].username);
    await page.locator("#passwordOnRegister").fill(credentials[8].password);
    await page.locator("#register").click();
    await expect(page.locator("#errorMessageOnRegister")).toHaveText(MESSAGES.REGISTER_SUCCESS);
  });

  test("Register with valid username and password.length = 20", async ({ page }) => {
    await page.locator("#userNameOnRegister").fill(credentials[9].username);
    await page.locator("#passwordOnRegister").fill(credentials[9].password);
    await page.locator("#register").click();
    await expect(page.locator("#errorMessageOnRegister")).toHaveText(MESSAGES.REGISTER_SUCCESS);
  });

  test("Register with valid username and password, which consists only from spaces", async ({ page }) => {
    await page.locator("#userNameOnRegister").fill(credentials[10].username);
    await page.locator("#passwordOnRegister").fill(credentials[10].password);
    await page.locator("#register").click();
    await expect(page.locator("#errorMessageOnRegister")).toHaveText(MESSAGES.EMPTY_PASSWORD);
  });

  test("Register with valid username and password, which doesn't have any lowercase letter", async ({ page }) => {
    await page.locator("#userNameOnRegister").fill(credentials[11].username);
    await page.locator("#passwordOnRegister").fill(credentials[11].password);
    await page.locator("#register").click();
    await expect(page.locator("#errorMessageOnRegister")).toHaveText(MESSAGES.PASSWORD_NO_LOWERCASE);
  });
});
