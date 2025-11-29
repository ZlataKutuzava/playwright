import { expect, test } from "src/fixtures/business.fixture";
import { NOTIFICATIONS } from "src/data/salesPortal/notifications";

test.describe("[Sales Portal] [Add new Product]", async () => {
  let id = "";
  let token = "";
  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
    id = "";
  });
  test("Add new product with services", async ({ loginUIService, addNewProductUIService, productsListPage }) => {
    token = await loginUIService.loginAsAdmin();
    await addNewProductUIService.open();
    const createdProduct = await addNewProductUIService.create();
    id = createdProduct._id;
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
    await expect(productsListPage.productInTableRow(createdProduct.name)).toBeVisible();
  });
});
