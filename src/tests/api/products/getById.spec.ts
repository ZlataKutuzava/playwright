import { test, expect } from "src/fixtures/api.fixture";
import { getProductSchema } from "src/data/schemas/products/get.schema";
import { STATUS_CODES } from "src/data/statusCodes";
import { validateResponse } from "src/utils/validateResponse.utils";

test.describe("[API] [Sales Portal] [Products]", () => {
  let id = "";
  let token = "";
  test.afterEach(async ({ productsApiService }) => {
    await productsApiService.delete(token, id);
  });
  test("Get Product By Id", async ({ loginApiService, productsApi, productsApiService }) => {
    token = (await loginApiService.loginAsAdmin())!;
    const product = await productsApiService.create(token);
    id = product._id;

    const getProductResponse = await productsApi.getById(id, token);
    validateResponse(getProductResponse, {
      status: STATUS_CODES.OK,
      schema: getProductSchema,
      IsSuccess: true,
      ErrorMessage: null
    });
    expect(getProductResponse.body.Product).toEqual(product);
  });
});
