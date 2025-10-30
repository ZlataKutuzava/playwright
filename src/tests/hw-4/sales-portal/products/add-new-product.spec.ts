import test, { expect } from "@playwright/test";
import { credentials } from "src/config/env";
import { NOTIFICATIONS } from "src/data/salesPortal/notifications";
import { generateproductData } from "src/data/salesPortal/products/generateProductData";
import { HomePage } from "src/ui/pages/home.page";
import { LoginPage } from "src/ui/pages/login.page";
import { AddNewProductPage } from "src/ui/pages/products/addNewProduct.page";
import { ProductsListPage } from "src/ui/pages/products/productsList.page";

test.describe("[Sales Portal] [Add new Product]", async () => {
  test("Add new product", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const productsListPage = new ProductsListPage(page);
    const addNewProductPage = new AddNewProductPage(page);
    await loginPage.open();
    await loginPage.fillCredentials({
      username: credentials.username,
      password: credentials.password
    });
    await loginPage.clickLoginButton();
    await homePage.waitForPageOpened();
    await homePage.clickOnViewModule("Products");
    await productsListPage.waitForPageOpened();
    await productsListPage.clickAddNewProduct();
    await addNewProductPage.waitForPageOpened();
    const productData = generateproductData();
    await addNewProductPage.fillForm(productData);
    await addNewProductPage.clickSaveButton();
    await productsListPage.waitForPageOpened();
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
    await expect((await productsListPage.getFirstRow()).name).toEqual(productData.name);
    await expect((await productsListPage.getFirstRow()).price).toEqual(productData.price);
    await expect((await productsListPage.getFirstRow()).manufacturer).toEqual(productData.manufacturer);
  });
});
