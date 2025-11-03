import { test as base, expect } from "@playwright/test";
import { HomePage } from "src/ui/pages/home.page";
import { LoginPage } from "src/ui/pages/login.page";
import { AddNewProductPage } from "src/ui/pages/products/addNewProduct.page";
import { ProductsListPage } from "src/ui/pages/products/productsList.page";

interface IPages {
  homePage: HomePage;
  loginPage: LoginPage;
  productsListPage: ProductsListPage;
  addNewProductPage: AddNewProductPage;
}

const test = base.extend<IPages>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  productsListPage: async ({ page }, use) => {
    await use(new ProductsListPage(page));
  },
  addNewProductPage: async ({ page }, use) => {
    await use(new AddNewProductPage(page));
  }
});

export { test, expect };
