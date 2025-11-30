import { expect, Locator } from "@playwright/test";
import { BasePage } from "./base.page";
import { SALES_PORTAL_URL } from "src/config/env";
import { logStep } from "src/utils/report/logStep.utils";

export abstract class SalesPortalPage extends BasePage {
  readonly spinner = this.page.locator(".spinner-border");
  readonly toastMessage = this.page.locator(".toast-body");
  readonly toastCloseButton = this.page.locator("#toast button");
  abstract readonly uniqueElement: Locator;

  @logStep("Wait For Page to be opened")
  async waitForOpened() {
    await expect(this.uniqueElement).toBeVisible();
    await this.waitForSpinners();
  }

  @logStep("Wait For spinners to disappear")
  async waitForSpinners() {
    await expect(this.spinner).toHaveCount(0, { timeout: 10000 });
  }

  @logStep("Open page by the URL")
  async open(route?: string) {
    await this.page.goto(SALES_PORTAL_URL + route);
  }

  @logStep("Close Toast Message")
  async closeToastMessage() {
    await this.toastCloseButton.click();
    await expect(this.toastMessage).toHaveCount(0);
  }
}
