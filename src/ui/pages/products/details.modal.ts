import { IProductDetailsModal } from "src/data/types/product.types";
import { SalesPortalPage } from "../salesPortal.page";
import { MANUFACTURERS } from "src/data/salesPortal/products/manufacturers";
export class DetailsProductModal extends SalesPortalPage {
  readonly uniqueElement = this.page.locator("#details-modal-container");
  readonly closeButton = this.uniqueElement.locator("button.btn-close");
  readonly editButton = this.uniqueElement.locator("button.btn-primary");
  readonly cancelButton = this.uniqueElement.locator("button.btn-secondary");
  readonly productData = this.uniqueElement.locator("p");

  async clickClose() {
    await this.closeButton.click();
  }

  async clickCancel() {
    await this.cancelButton.click();
  }

  async clickEdit() {
    await this.editButton.click();
  }

  async getData(): Promise<IProductDetailsModal> {
    const [name, amount, price, manufacturer, createdOn, notes] = await this.productData.allInnerTexts();
    return {
      name: name!,
      amount: +amount!,
      price: +price!,
      manufacturer: manufacturer! as MANUFACTURERS,
      createdOn: createdOn!,
      notes: notes === "-" ? "" : notes!
    };
  }
}
