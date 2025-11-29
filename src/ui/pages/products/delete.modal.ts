import { BaseModal } from "../base.modal";

export class DeleteModal extends BaseModal {
  readonly uniqueElement = this.page.locator(".modal-content");
  readonly title = this.uniqueElement.locator("h5");
  readonly closeButton = this.uniqueElement.locator(".btn-close");
  readonly confirmButton = this.uniqueElement.locator("//button[text()='Yes, Delete']");
  readonly cancelButton = this.uniqueElement.locator("//button[text()='Cancel']");

  async clickClose() {
    await this.closeButton.click();
  }

  async clickCancel() {
    await this.cancelButton.click();
  }

  async clickConfirm() {
    await this.confirmButton.click();
  }
}
