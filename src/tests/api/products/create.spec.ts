import _ from "lodash";
import { generateproductData } from "src/data/salesPortal/products/generateProductData";
import { createProductSchema } from "src/data/schemas/products/create.schema";
import { STATUS_CODES } from "src/data/statusCodes";
import { test, expect } from "src/fixtures/api.fixture";
import { validateResponse } from "src/utils/validateResponse.utils";

test.describe("[API] [Sales Portal] [Products]", () => {
  let id = "";
  let token = "";
  test.afterEach(async ({ productsApiService }) => {
    await productsApiService.delete(token, id);
  });

  test("Create Product with api class", async ({ loginApiService, productsApi }) => {
    token = (await loginApiService.loginAsAdmin())!;
    const productData = generateproductData();
    const createdProduct = await productsApi.create(productData, token);
    validateResponse(createdProduct, {
      status: STATUS_CODES.CREATED,
      schema: createProductSchema,
      IsSuccess: true,
      ErrorMessage: null
    });
    id = createdProduct.body.Product._id;
    const actualProductData = createdProduct.body.Product;
    expect(_.omit(actualProductData, ["_id", "createdOn"])).toEqual(productData);
  });
});
