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

// Используя DDT подход, напишите тест сьют для проверки эндпоинта создания продукта:
//   - с позитивными проверками
//   - с негативыми проверками

//   Используйте LoginApiService, ProductsApi, после каждого теста, где создастся продукт - удаляйте его.

//   Требования:
//   Name: обязательное, уникальное, Products's name should contain only 3-40 alphanumerical characters and one space between
//   Manufacturer: обязательное
//   Price: обязательное, Price should be in range 1-99999
//   Amount: обязательное, Amount should be in range 0-999
//   Notes: Notes should be in range 0-250 and without < or > symbols

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
    test(`[Positive Checks] - ${title}`, async ({ productsApi }) => {
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
    });
  }
  for (const { title, value } of createProductNegativeChecks) {
    test.beforeEach(async ({ loginApiService }) => {
      token = (await loginApiService.loginAsAdmin())!;
    });
    test(`[Negative Checks] - ${title}`, async ({ productsApi }) => {
      const productDataNegative = generateproductData(value);
      const createdProduct = await productsApi.create(productDataNegative, token);
      validateResponse(createdProduct, {
        status: STATUS_CODES.BAD_REQUEST,
        IsSuccess: false,
        ErrorMessage: "Incorrect request body"
      });
    });
  }
});
