import { expect, test } from "src/fixtures/business.fixture";
import { NOTIFICATIONS } from "src/data/salesPortal/notifications";
import { TAGS } from "src/data/types/tags";

test.describe("[Sales Portal] [Add new Product]", async () => {
  let id = "";
  let token = "";
  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
    id = "";
  });
  test(
    "Add new product with services",
    {
      tag: [TAGS.REGRESSION, TAGS.UI, TAGS.VISUAL_REGRESSION]
    },
    async ({ addNewProductUIService, productsListPage }) => {
      token = await productsListPage.getAuthToken();
      await addNewProductUIService.open();
      const createdProduct = await addNewProductUIService.create();
      id = createdProduct._id;
      await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
      await expect(productsListPage.productInTableRow(createdProduct.name)).toBeVisible();
    }
  );
});
