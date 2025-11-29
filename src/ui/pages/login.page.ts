import { SalesPortalPage } from "./salesPortal.page";
import { ICredentials } from "src/data/types/credentials.types";

export class LoginPage extends SalesPortalPage {
  readonly formLabel = this.page.locator("p.lead");
  readonly emailAddressInput = this.page.locator("#emailinput");
  readonly passwordInput = this.page.locator("#passwordinput");
  readonly loginButton = this.page.locator("//*[@type='submit']");
  readonly uniqueElement = this.formLabel;

  async fillCredentials(credentials: Partial<ICredentials>) {
    if (credentials.username) await this.emailAddressInput.fill(credentials.username);
    if (credentials.password) await this.passwordInput.fill(credentials.password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }
}
