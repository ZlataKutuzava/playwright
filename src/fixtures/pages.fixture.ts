import { test as base, expect } from "@playwright/test";
import { AddNewCustomerPage, CustomersListPage } from "src/ui/pages/customers";
import { HomePage } from "src/ui/pages/home.page";
import { LoginPage } from "src/ui/pages/login.page";
import { AddNewProductPage } from "src/ui/pages/products/addNewProduct.page";
import { EditProductPage } from "src/ui/pages/products/editProduct.page";
import { ProductsListPage } from "src/ui/pages/products/productsList.page";
import { AddNewCustomerUIService } from "src/ui/service/addNewCustomer.ui-service";
import { AddNewProductUIService } from "src/ui/service/addNewProduct.ui-service";
import { CustomersListUIService } from "src/ui/service/customersList.ui-service";
import { EditProductUIService } from "src/ui/service/editProduct.ui-service";
import { HomeUIService } from "src/ui/service/home.ui-service";
import { LoginUIService } from "src/ui/service/login.ui-service";
import { ProductsListUIService } from "src/ui/service/productsList.ui-service";

export interface IPages {
  //pages
  homePage: HomePage;
  loginPage: LoginPage;
  productsListPage: ProductsListPage;
  addNewProductPage: AddNewProductPage;
  editProductPage: EditProductPage;
  addNewCustomerPage: AddNewCustomerPage;
  customersListPage: CustomersListPage;
  //services
  homeUIService: HomeUIService;
  loginUIService: LoginUIService;
  productsListUIService: ProductsListUIService;
  addNewProductUIService: AddNewProductUIService;
  editProductUIService: EditProductUIService;
  addNewCustomerUIService: AddNewCustomerUIService;
  customersListUIService: CustomersListUIService;
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
  },
  editProductPage: async ({ page }, use) => {
    await use(new EditProductPage(page));
  },
  addNewCustomerPage: async ({ page }, use) => {
    await use(new AddNewCustomerPage(page));
  },
  customersListPage: async ({ page }, use) => {
    await use(new CustomersListPage(page));
  },
  loginUIService: async ({ page }, use) => {
    await use(new LoginUIService(page));
  },
  homeUIService: async ({ page }, use) => {
    await use(new HomeUIService(page));
  },
  productsListUIService: async ({ page }, use) => {
    await use(new ProductsListUIService(page));
  },
  addNewProductUIService: async ({ page }, use) => {
    await use(new AddNewProductUIService(page));
  },
  editProductUIService: async ({ page }, use) => {
    await use(new EditProductUIService(page));
  },
  addNewCustomerUIService: async ({ page }, use) => {
    await use(new AddNewCustomerUIService(page));
  },
  customersListUIService: async ({ page }, use) => {
    await use(new CustomersListUIService(page));
  }
});

export { test, expect };
