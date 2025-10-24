import { expect, Page } from "@playwright/test";
import { ITableRow } from "./tableData";

export async function getTableRow(page: Page, email: string): Promise<ITableRow> {
  const table = page.locator("table#table2");
  await expect(table).toBeVisible();
  const emailCell = table.locator(`//td[text()='${email}']`);
  await expect(emailCell).toBeVisible();
  const row = emailCell.locator("//parent::tr");
  const cells = await row.locator("td").allInnerTexts();
  const [lastName, firstName, emailAddress, due, webSite] = cells;
  if (!lastName || !firstName || !emailAddress || !due || !webSite) {
    throw new Error(`${email} does not exist in the table.`);
  }
  console.log({
    "Last Name": lastName,
    "First Name": firstName,
    Email: emailAddress,
    Due: due,
    "Web Site": webSite
  });
  return {
    "Last Name": lastName,
    "First Name": firstName,
    Email: emailAddress,
    Due: due,
    "Web Site": webSite
  };
}
