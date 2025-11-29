import { IProduct } from "src/data/types/product.types";
import { SalesPortalPage } from "../salesPortal.page";

export class EditProductPage extends SalesPortalPage {
  readonly uniqueElement = this.page.locator("#edit-product-container");
  readonly title = this.uniqueElement.locator("h2");
  readonly nameInput = this.uniqueElement.locator("#inputName");
  readonly manufacturerSelect = this.uniqueElement.locator("#inputManufacturer");
  readonly priceInput = this.uniqueElement.locator("#inputPrice");
  readonly amountInput = this.uniqueElement.locator("#inputAmount");
  readonly notesInput = this.uniqueElement.locator("#textareaNotes");
  readonly saveChangesButton = this.uniqueElement.locator("#save-product-changes");
  readonly deleteProductButton = this.uniqueElement.locator("#delete-product-btn");

  async fillForm(productData: Partial<IProduct>) {
    if (productData.name) await this.nameInput.fill(productData.name);
    if (productData.manufacturer) await this.manufacturerSelect.selectOption(productData.manufacturer);
    if (productData.price) await this.priceInput.fill(productData.price.toString());
    if (productData.amount) await this.amountInput.fill(productData.amount.toString());
    if (productData.notes) await this.notesInput.fill(productData.notes);
  }

  async submitProductUpdate() {
    await this.saveChangesButton.click();
  }
}
