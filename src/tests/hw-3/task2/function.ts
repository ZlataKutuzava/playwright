import { expect, Page } from "@playwright/test";
import { ITableRow } from "./tabledata";

export async function getTableRow(page: Page, email: string): Promise<ITableRow> {
  const table = page.locator("table#table2");
  await expect(table).toBeVisible();
  const row = page.locator(`//tr[td[text()='${email}']]`);
  const cells = await row.locator("td").allInnerTexts();
  const headers = await table.locator("th").allInnerTexts();
  headers.pop();
  const result = {} as ITableRow;
  headers.forEach((header, index) => {
    result[header as keyof ITableRow] = cells[index] ?? "";
  });
  return result;
}
