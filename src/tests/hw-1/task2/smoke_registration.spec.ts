// Создайте ОДИН смоук тест со следующими шагами:

// 1. Переход на страницу https://anatoly-karpovich.github.io/demo-registration-form/
// 2. Заполните форму регистрации
// 3. Проверьте, что пользователь успешно зарегистрирован

import { test, expect } from "@playwright/test";

test.describe("[Anatoly-Karpovich] [Registration Form]", () => {
  test("Registration with valid values", async ({ page }) => {
    const firstNameField = page.locator("#firstName");
    const lastNameField = page.locator("#lastName");
    const addressTextArea = page.locator("#address");
    const emailAddressField = page.locator("#email");
    const phoneField = page.locator("#phone");
    const countryDropdown = page.locator("#country");
    const genderRadioButton = (gender: string) => page.locator(`//*[@value="${gender}"]`);
    const hobbiesCheckbox = (hobby: string) => page.locator(`//*[@type="checkbox"][@value="${hobby}"]`);
    const languageField = page.locator("#language");
    const skillsMultiSelect = (skill: string) => page.locator(`//*[@id="skills"]//option[text()="${skill}"]`);
    const yearDropDown = page.locator("//*[@id='year']");
    const monthDropDown = page.locator("//*[@id='month']");
    const dayDropDown = page.locator("//*[@id='day']");
    const passwordField = page.locator("#password");
    const passwordConfirmField = page.locator("#password-confirm");
    const submitButton = page.locator(`//button[@type="submit"]`);

    interface IUser {
      firstName: string;
      lastName: string;
      address: string;
      email: string;
      phone: string;
      country: string;
      gender: string;
      hobby: string;
      language: string;
      skill: string;
      year: string;
      month: string;
      day: string;
      password: string;
    }

    const validTestData: IUser = {
      firstName: "Nelly",
      lastName: "Furtado",
      address: "Toronto, 2158 Acton Avenue",
      email: "nelly@timbaland.com",
      phone: "1233456456",
      country: "Canada",
      gender: "female",
      hobby: "Dancing",
      language: "English",
      skill: "JavaScript",
      year: "1978",
      month: "December",
      day: "2",
      password: "Giveit2me"
    };

    const url = "https://anatoly-karpovich.github.io/demo-registration-form/";
    await page.goto(url);
    await expect(page.getByRole("heading", { level: 2, name: "Register" })).toBeVisible();

    await firstNameField.fill(validTestData.firstName);
    await lastNameField.fill(validTestData.lastName);
    await addressTextArea.fill(validTestData.address);
    await emailAddressField.fill(validTestData.email);
    await phoneField.fill(validTestData.phone);
    await countryDropdown.selectOption(validTestData.country);
    await genderRadioButton(validTestData.gender).check();
    await hobbiesCheckbox(validTestData.hobby).check();
    await languageField.fill(validTestData.language);
    await skillsMultiSelect(validTestData.skill).click();
    await yearDropDown.selectOption(validTestData.year);
    await monthDropDown.selectOption(validTestData.month);
    await dayDropDown.selectOption(validTestData.day);
    await passwordField.fill(validTestData.password);
    await passwordConfirmField.fill(validTestData.password);
    await submitButton.click();

    await expect(page.getByRole("heading", { level: 2, name: "Registration Details" })).toBeVisible();
    await expect(page.locator("#fullName")).toHaveText(`${validTestData.firstName} ${validTestData.lastName}`);
    await expect(page.locator("#address")).toHaveText(`${validTestData.address}`);
    await expect(page.locator("#email")).toHaveText(`${validTestData.email}`);
    await expect(page.locator("#phone")).toHaveText(`${validTestData.phone}`);
    await expect(page.locator("#country")).toHaveText(`${validTestData.country}`);
    await expect(page.locator("#gender")).toHaveText(`${validTestData.gender}`);
    await expect(page.locator("#language")).toHaveText(`${validTestData.language}`);
    await expect(page.locator("#skills")).toHaveText(`${validTestData.skill}`);
    await expect(page.locator("#hobbies")).toHaveText(`${validTestData.hobby}`);
    await expect(page.locator("#dateOfBirth")).toHaveText(
      `${validTestData.day} ${validTestData.month} ${validTestData.year}`
    );
    await expect(page.locator("#password")).toHaveText("*".repeat(validTestData.password.length));
    await expect(page.getByRole("button")).toHaveText("Back to Form");
  });
});
