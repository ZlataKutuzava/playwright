import { Page } from "playwright/test";
import { HomeModuleButton, HomePage } from "../pages/home.page";
import { ProductsListPage } from "../pages/products/productsList.page";
import { logStep } from "src/utils/report/logStep.utils";

export class HomeUIService {
  homePage: HomePage;
  productsListPages: ProductsListPage;
  constructor(private page: Page) {
    this.homePage = new HomePage(page);
    this.productsListPages = new ProductsListPage(page);
  }

  @logStep("Open Module")
  async openModule(moduleName: HomeModuleButton) {
    await this.homePage.clickOnViewModule(moduleName);
    if (moduleName === "Products") {
      await this.productsListPages.waitForOpened();
    }
  }
}
