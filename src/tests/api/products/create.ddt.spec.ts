import _ from "lodash";
import { generateproductData } from "src/data/salesPortal/products/generateProductData";
import { createProductSchema } from "src/data/schemas/products/create.schema";
import { STATUS_CODES } from "src/data/statusCodes";
import { test, expect } from "src/fixtures/api.fixture";
import { validateResponse } from "src/utils/validateResponse.utils";
import {
  createProductPositiveChecks,
  createProductNegativeChecks
} from "src/data/salesPortal/products/createProductDDT";
import { TAGS } from "src/data/types/tags";

test.describe("[API] [Sales Portal] [Products - DDT]", async () => {
  let id = "";
  let token = "";
  test.beforeEach(async ({ loginApiService }) => {
    token = (await loginApiService.loginAsAdmin())!;
  });

  test.afterEach(async ({ productsApiService }) => {
    if (id) {
      await productsApiService.delete(token, id);
      id = "";
    }
  });
  for (const { title, value } of createProductPositiveChecks) {
    test(
      `[Positive Checks] - ${title}`,
      {
        tag: [TAGS.REGRESSION, TAGS.API]
      },
      async ({ productsApi }) => {
        const productDataPositive = generateproductData(value);
        const createdProduct = await productsApi.create(productDataPositive, token);
        validateResponse(createdProduct, {
          status: STATUS_CODES.CREATED,
          schema: createProductSchema,
          IsSuccess: true,
          ErrorMessage: null
        });
        id = createdProduct.body.Product._id;
        const actualProductData = createdProduct.body.Product;
        expect(_.omit(actualProductData, ["_id", "createdOn"])).toEqual(productDataPositive);
      }
    );
  }
  for (const { title, value } of createProductNegativeChecks) {
    test.beforeEach(async ({ loginApiService }) => {
      token = (await loginApiService.loginAsAdmin())!;
    });
    test(
      `[Negative Checks] - ${title}`,
      {
        tag: [TAGS.REGRESSION, TAGS.API]
      },
      async ({ productsApi }) => {
        const productDataNegative = generateproductData(value);
        const createdProduct = await productsApi.create(productDataNegative, token);
        validateResponse(createdProduct, {
          status: STATUS_CODES.BAD_REQUEST,
          IsSuccess: false,
          ErrorMessage: "Incorrect request body"
        });
      }
    );
  }
});
