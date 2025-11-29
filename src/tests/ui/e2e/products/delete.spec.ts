import { NOTIFICATIONS } from "src/data/salesPortal/notifications";
import { STATUS_CODES } from "src/data/statusCodes";
import { expect, test } from "src/fixtures/business.fixture";

test.describe("[Sales Portal] [Products]", () => {
  test("Delete with services", async ({
    loginUIService,
    productsApiService,
    homeUIService,
    productsListUIService,
    productsListPage,
    productsApi
  }) => {
    const token = await loginUIService.loginAsAdmin();
    const createdProduct = await productsApiService.create(token);
    await homeUIService.openModule("Products");
    await productsListUIService.deleteProduct(createdProduct.name);
    const deletedproductID = await productsApi.getById(createdProduct._id, token);
    expect(deletedproductID.status).toBe(STATUS_CODES.NOT_FOUND);
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_DELETED);
    await expect(productsListPage.productInTableRow(createdProduct.name)).not.toBeVisible();
  });
});
