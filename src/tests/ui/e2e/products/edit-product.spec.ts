import { expect, test } from "src/fixtures/business.fixture";
import { NOTIFICATIONS } from "src/data/salesPortal/notifications";

test.describe("[Sales Portal] [Add new Product]", async () => {
  let id = "";
  let token = "";
  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
    id = "";
  });
  test("Edit product with services", async ({
    loginUIService,
    productsApiService,
    productsListPage,
    productsListUIService,
    editProductUIService
  }) => {
    token = await loginUIService.loginAsAdmin();
    const createdProduct = await productsApiService.create(token);
    id = createdProduct._id;
    await productsListUIService.open();
    await productsListUIService.editProduct(createdProduct.name);
    const updatedProductData = await editProductUIService.edit();
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_UPDATED);
    await expect(productsListPage.productInTableRow(updatedProductData.name)).toBeVisible();
    await productsListUIService.openDetailsModal(updatedProductData.name);
    const actual = await productsListPage.detailsModal.getData();
    await productsListUIService.assertDetailsData(actual, updatedProductData);
  });
});
