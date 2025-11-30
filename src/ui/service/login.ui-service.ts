import { Page } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { ICredentials } from "src/data/types/credentials.types";
import { credentials } from "src/config/env";
import { logStep } from "src/utils/report/logStep.utils";

export class LoginUIService {
  homePage: HomePage;
  loginPage: LoginPage;

  constructor(private page: Page) {
    this.homePage = new HomePage(page);
    this.loginPage = new LoginPage(page);
  }

  @logStep("Open Login Page")
  async open() {
    await this.loginPage.open("login");
    await this.loginPage.waitForOpened();
  }

  @logStep("Login as Admin")
  async loginAsAdmin() {
    return await this.login(credentials);
  }

  @logStep("Login using custom credentials")
  async login(credentials: ICredentials) {
    await this.loginPage.open();
    await this.loginPage.fillCredentials(credentials);
    await this.loginPage.clickLoginButton();
    await this.homePage.waitForOpened();
    const token = (await this.page.context().cookies()).find(
      (c) => c.name === "Authorization"
    )!.value;
    return token;
  }
}
