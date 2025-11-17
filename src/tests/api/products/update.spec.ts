import { test, expect } from "src/fixtures/api.fixture";
import _ from "lodash";
import { generateproductData } from "src/data/salesPortal/products/generateProductData";
import { createProductSchema } from "src/data/schemas/products/create.schema";
import { STATUS_CODES } from "src/data/statusCodes";
import { validateResponse } from "src/utils/validateResponse.utils";

test.describe("[API] [Sales Portal] [Products]", () => {
  let id = "";
  let token = "";
  test.afterEach(async ({ productsApiService }) => {
    await productsApiService.delete(token, id);
  });
  test("Update Product By Id", async ({ loginApiService, productsApiService, productsApi }) => {
    token = (await loginApiService.loginAsAdmin())!;
    const createdProduct = await productsApiService.create(token);
    id = createdProduct._id;

    const updatedProductData = generateproductData();

    const updatedProductResponse = await productsApi.update(id, updatedProductData, token);
    validateResponse(updatedProductResponse, {
      status: STATUS_CODES.OK,
      schema: createProductSchema,
      IsSuccess: true,
      ErrorMessage: null
    });
    const updatedProduct = await updatedProductResponse.body;
    expect(_.omit(updatedProduct.Product, ["_id", "createdOn"])).toEqual(updatedProductData);
    expect(id).toBe(updatedProduct.Product._id);
  });
});
