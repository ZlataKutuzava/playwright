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
}
