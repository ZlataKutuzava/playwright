import { test } from "src/fixtures/business.fixture";

test.describe("[Integration] [Sales Portal] [Products]", () => {
  let id = "";
  let token = "";
  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
    id = "";
  });
  test("Product Details with services", async ({
    loginUIService,
    homeUIService,
    productsListPage,
    productsListUIService,
    productsApiService
  }) => {
    token = await loginUIService.loginAsAdmin();
    const createdProduct = await productsApiService.create(token);
    id = createdProduct._id;
    await homeUIService.openModule("Products");
    await productsListUIService.openDetailsModal(createdProduct.name);
    const actual = await productsListPage.detailsModal.getData();
    productsListUIService.assertDetailsData(actual, createdProduct);
  });
});
