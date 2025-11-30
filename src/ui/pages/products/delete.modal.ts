import { logStep } from "src/utils/report/logStep.utils";
import { BaseModal } from "../base.modal";

export class DeleteModal extends BaseModal {
  readonly uniqueElement = this.page.locator(".modal-content");
  readonly title = this.uniqueElement.locator("h5");
  readonly closeButton = this.uniqueElement.locator(".btn-close");
  readonly confirmButton = this.uniqueElement.locator("//button[text()='Yes, Delete']");
  readonly cancelButton = this.uniqueElement.locator("//button[text()='Cancel']");

  @logStep("Close Product Delete Modal")
  async clickClose() {
    await this.closeButton.click();
  }

  @logStep("Cancel Product Delete Modal")
  async clickCancel() {
    await this.cancelButton.click();
  }

  @logStep("Confirm Product Delete Modal")
  async clickConfirm() {
    await this.confirmButton.click();
  }
}
