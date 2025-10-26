// Создать функцию getTableRow(page, email), которая возвращает строку в таблице по емейлу.
// Например getTableRow(page, 'jsmith@gmail.com') =>
// { "Last Name": "Smith", "First Name": "John", Email: "jsmith@gmail.com", Due: "$50.00", "Web Site": "http://www.jsmith.com" }

// Создайте тест, проверяющий данную функцию, используя все емейлы из таблицы Example 2

// Сайт: https://the-internet.herokuapp.com/tables

import { test, expect } from "@playwright/test";
import { expectedTable } from "./tabledata";
import { getTableRow } from "./function";

test.describe("[Herokuapp] [Example Table 2]", () => {
  test("Return rows by email for the Example table 2", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/tables");
    await expect(page.getByRole("heading", { level: 3 })).toHaveText("Data Tables");
    for (const expectedRow of expectedTable) {
      const actualRow = await getTableRow(page, expectedRow.Email);
      expect(actualRow).toEqual(expectedRow);
    }
  });
});
