import { test, expect } from "src/fixtures/api.fixture";
import _ from "lodash";
import { generateproductData } from "src/data/salesPortal/products/generateProductData";
import { createProductSchema } from "src/data/schemas/products/create.schema";
import { getProductsAllSchema } from "src/data/schemas/products/productsAll.schema";
import { STATUS_CODES } from "src/data/statusCodes";
import { IProductFromResponse } from "src/data/types/product.types";
import { validateResponse } from "src/utils/validateResponse.utils";

test.describe("[API] [Sales Portal] [Products]", () => {
  let token = "";
  let id = "";
  test.afterEach(async ({ productsApiService }) => {
    await productsApiService.delete(token, id);
  });
  test("Get the list of all products (no pagination, filters or sorting)", async ({ loginApiService, productsApi }) => {
    token = (await loginApiService.loginAsAdmin())!;

    const product = generateproductData();
    const createProductBody = await productsApi.create(product, token);
    validateResponse(createProductBody, {
      status: STATUS_CODES.CREATED,
      schema: createProductSchema,
      IsSuccess: true,
      ErrorMessage: null
    });
    const actualProductData = createProductBody.body.Product;
    expect(_.omit(actualProductData, ["_id", "createdOn"])).toEqual(product);

    id = actualProductData._id;

    const getProductsAllResponse = await productsApi.getAll(token);
    validateResponse(getProductsAllResponse, {
      status: STATUS_CODES.OK,
      schema: getProductsAllSchema,
      IsSuccess: true,
      ErrorMessage: null
    });

    const getProductsAllResponseBody = await getProductsAllResponse.body;
    const objectInArray = await getProductsAllResponseBody["Products"].find(
      (object: IProductFromResponse) => object._id === id
    );
    expect(_.omit(objectInArray, ["_id", "createdOn"])).toEqual(product);
  });
});
