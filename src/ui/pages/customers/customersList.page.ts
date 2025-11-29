import { SalesPortalPage } from "../salesPortal.page";

export class CustomersListPage extends SalesPortalPage {
  readonly uniqueElement = this.page.locator("#title");
  readonly addCustomerButton = this.page.locator("[name='add-button']");
  readonly tableRow = this.page.locator("tbody tr");
  readonly firstTableRow = this.tableRow.first();
  readonly customerInTableRow = (customerName: string) =>
    this.page.locator("table tbody tr", {
      has: this.page.locator("td", { hasText: customerName })
    });
  readonly tableHeader = this.page.locator("thead th div[current]");
  readonly tableHeaderNamed = (name: "Email" | "Name" | "Country" | "Created On") => {
    return this.tableHeader.filter({ hasText: name });
  };
  readonly editButton = (productName: string) => this.customerInTableRow(productName).getByTitle("Edit");
  readonly deleteButton = (productName: string) => this.customerInTableRow(productName).getByTitle("Delete");
  readonly detailsButton = (productName: string) => this.customerInTableRow(productName).getByTitle("Details");

  async clickAction(productName: string, button: "edit" | "delete" | "details") {
    if (button === "edit") await this.editButton(productName).click();
    if (button === "delete") await this.deleteButton(productName).click();
    if (button === "details") await this.detailsButton(productName).click();
  }

  async clickAddNewCustomer() {
    await this.addCustomerButton.click();
  }
}
