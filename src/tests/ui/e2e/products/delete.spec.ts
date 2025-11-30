/* eslint-disable prettier/prettier */
import { NOTIFICATIONS } from "src/data/salesPortal/notifications";
import { STATUS_CODES } from "src/data/statusCodes";
import { TAGS } from "src/data/types/tags";
import { expect, test } from "src/fixtures/business.fixture";

test.describe("[Sales Portal] [Products]", () => {
  test(
    "Delete with services",
    {
      tag: [TAGS.REGRESSION, TAGS.UI, TAGS.VISUAL_REGRESSION]
    },
    async ({
      productsApiService,
      productsListUIService,
      productsListPage,
      productsApi
    }) => {
      const token = await productsListPage.getAuthToken();
      const createdProduct = await productsApiService.create(token);
      await productsListUIService.open();
      await productsListUIService.deleteProduct(createdProduct.name);
      const deletedproductID = await productsApi.getById(
        createdProduct._id,
        token
      );
      expect(deletedproductID.status).toBe(STATUS_CODES.NOT_FOUND);
      await expect(productsListPage.toastMessage).toContainText(
        NOTIFICATIONS.PRODUCT_DELETED
      );
      await expect(
        productsListPage.productInTableRow(createdProduct.name)
      ).not.toBeVisible();
    }
  );
});
