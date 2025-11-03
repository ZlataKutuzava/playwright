import { test, expect } from "../../../../fixtures/pages.fixture";
import _ from "lodash";
import { credentials } from "src/config/env";
import { NOTIFICATIONS } from "src/data/salesPortal/notifications";
import { generateproductData } from "src/data/salesPortal/products/generateProductData";

test.describe("[Sales Portal] [Add new Product]", async () => {
  test("Add new product", async ({ homePage, loginPage, productsListPage, addNewProductPage }) => {
    const { deleteModal } = productsListPage;
    await loginPage.open();
    await loginPage.fillCredentials({
      username: credentials.username,
      password: credentials.password
    });
    await loginPage.clickLoginButton();
    await homePage.waitForOpened();
    await homePage.clickOnViewModule("Products");
    await productsListPage.waitForOpened();
    await productsListPage.clickAddNewProduct();
    await addNewProductPage.waitForOpened();
    const productData = generateproductData();
    await addNewProductPage.fillForm(productData);
    await addNewProductPage.clickSaveButton();
    await productsListPage.waitForOpened();
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
    await productsListPage.closeToastMessage();
    await expect(productsListPage.productInTableRow(productData.name)).toBeVisible();
    const expectedProduct = _.omit(productData, ["notes", "amount"]);
    const productInFirstTableRow = await productsListPage.getFirstRow();
    const actualProduct = _.omit(productInFirstTableRow, ["createdOn"]);
    await expect(actualProduct).toEqual(expectedProduct);

    await productsListPage.deleteButton(productData.name).click();
    await productsListPage.waitForSpinners();
    await deleteModal.waitForOpened();
    await deleteModal.submit();
    await deleteModal.waitForModalClosed();
    await expect(deleteModal.uniqueElement).not.toBeVisible();
    await expect(deleteModal.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_DELETED);
    await expect(productsListPage.productInTableRow(productData.name)).not.toBeVisible();
  });
});
