import { TAGS } from "src/data/types/tags";
import { test } from "src/fixtures/business.fixture";

test.describe("[Integration] [Sales Portal] [Products]", () => {
  let id = "";
  let token = "";
  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
    id = "";
  });
  test(
    "Product Details with services",
    {
      tag: [TAGS.REGRESSION, TAGS.UI, TAGS.VISUAL_REGRESSION]
    },
    async ({ productsListPage, productsListUIService, productsApiService }) => {
      token = await productsListPage.getAuthToken();
      const createdProduct = await productsApiService.create(token);
      id = createdProduct._id;
      await productsListUIService.open();
      await productsListUIService.openDetailsModal(createdProduct.name);
      const actual = await productsListPage.detailsModal.getData();
      productsListUIService.assertDetailsData(actual, createdProduct);
    }
  );
});
