import { expect } from "@playwright/test";
import { SalesPortalPage } from "./salesPortal.page";
import { logStep } from "src/utils/report/logStep.utils";

export abstract class BaseModal extends SalesPortalPage {
  @logStep("Wait for the modal to be closed")
  async waitForClosed() {
    await expect(this.uniqueElement).not.toBeVisible({ timeout: 10000 });
  }
}
