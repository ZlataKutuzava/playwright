import { expect } from "@playwright/test";
import { SalesPortalPage } from "../salesPortal.page";

export class DeleteProductModal extends SalesPortalPage {
  readonly uniqueElement = this.page.locator(".modal-content");
  readonly title = this.uniqueElement.locator("h5");
  readonly closeButton = this.uniqueElement.locator(".btn-close");
  readonly sumbitButton = this.uniqueElement.locator("//button[text()='Yes, Delete']");
  readonly cancelButton = this.uniqueElement.locator("//button[text()='Cancel']");

  async submit() {
    await this.sumbitButton.click();
  }

  async waitForModalClosed() {
    await expect(this.uniqueElement).not.toBeVisible();
  }
}
