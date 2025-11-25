import { IProductInTableRow } from "src/data/types/product.types";
import { SalesPortalPage } from "../salesPortal.page";
import { MANUFACTURERS } from "src/data/salesPortal/products/manufacturers";
import { DeleteProductModal } from "./details.modal";

export class ProductsListPage extends SalesPortalPage {
  readonly productsPageTitle = this.page.locator("h2.fw-bold");
  readonly addNewProductButton = this.page.locator("[name='add-button']");
  readonly productInTableRow = (productName: string) => this.page.locator(`//td[text()="${productName}"]//parent::tr`);
  readonly firstTableRow = this.page.locator("//tbody//tr").first();
  readonly detailsButton = (productName: string) => this.productInTableRow(productName).getByTitle("Details");
  readonly editButton = (productName: string) => this.productInTableRow(productName).getByTitle("Edit");
  readonly deleteButton = (productName: string) => this.productInTableRow(productName).getByTitle("Delete");
  readonly deleteModal = new DeleteProductModal(this.page);
  readonly uniqueElement = this.addNewProductButton;
  readonly tableRow = this.page.locator("tbody tr");
  readonly tableHeader = this.page.locator("thead th div[current]");
  readonly tableHeaderNamed = (name: "Name" | "Price" | "Manufacturer" | "Created On") => {
    return this.tableHeader.filter({ hasText: name });
  };
  readonly tableHeaderArrow = (
    name: "Name" | "Price" | "Manufacturer" | "Created On",
    { direction }: { direction: "asc" | "desc" }
  ) =>
    this.page
      .locator("thead th", {
        has: this.page.locator("div[current]", { hasText: name })
      })
      .locator(`i.${direction === "asc" ? "bi-arrow-down" : "bi-arrow-up"}`);

  async clickAddNewProduct() {
    await this.addNewProductButton.click();
  }

  async getFirstRow(): Promise<IProductInTableRow> {
    const [name, price, manufacturer, createdOn] = await this.firstTableRow.locator("td").allInnerTexts();
    return {
      name: name!,
      price: +price!.replace(/\D/g, ""),
      manufacturer: manufacturer as MANUFACTURERS,
      createdOn: createdOn!
    };
  }

  async getProductData(productName: string): Promise<IProductInTableRow> {
    const [name, price, manufacturer, createdOn] = await this.productInTableRow(productName)
      .locator("td")
      .allInnerTexts();
    return {
      name: name!,
      price: +price!.replace(/\D/g, ""),
      manufacturer: manufacturer as MANUFACTURERS,
      createdOn: createdOn!
    };
  }

  async clickAction(productName: string, button: "edit" | "delete" | "details") {
    if (button === "edit") await this.editButton(productName).click();
    if (button === "delete") await this.deleteButton(productName).click();
    if (button === "details") await this.detailsButton(productName).click();
  }

  async getTableData(): Promise<IProductInTableRow[]> {
    const data: IProductInTableRow[] = [];

    const rows = await this.tableRow.all();
    for (const row of rows) {
      const [name, price, manufacturer, createdOn] = await row.locator("td").allInnerTexts();
      data.push({
        name: name!,
        price: +price!.replace("$", ""),
        manufacturer: manufacturer! as MANUFACTURERS,
        createdOn: createdOn!
      });
    }
    return data;
  }

  async clickTableHeader(name: "Name" | "Price" | "Manufacturer" | "Created On") {
    await this.tableHeaderNamed(name).click();
  }
}
