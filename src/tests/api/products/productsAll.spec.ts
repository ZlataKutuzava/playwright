import test, { expect } from "@playwright/test";
import _ from "lodash";
import { apiConfig } from "src/config/apiConfig";
import { credentials } from "src/config/env";
import { generateproductData } from "src/data/salesPortal/products/generateProductData";
import { createProductSchema } from "src/data/schemas/products/create.schema";
import { getProductsAllSchema } from "src/data/schemas/products/productsAll.schema";
import { STATUS_CODES } from "src/data/statusCodes";
import { IProductFromResponse } from "src/data/types/product.types";
import { validateResponse } from "src/utils/validateResponse.utils";

const { baseURL, endpoints } = apiConfig;

test.describe("[API] [Sales Portal] [Products]", () => {
  let token = "";
  let id = "";
  test.afterEach(async ({ request }) => {
    const response = await request.delete(`${baseURL}${endpoints.productById(id)}`, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    expect(response.status()).toBe(STATUS_CODES.DELETED);
  });
  test("Get the list of all products (no pagination, filters or sorting)", async ({ request }) => {
    const loginResponse = await request.post(`${baseURL}${endpoints.login}`, {
      data: credentials,
      headers: {
        "content-type": "application/json"
      }
    });
    const loginBody = await loginResponse.json();
    expect(loginResponse.status()).toBe(STATUS_CODES.OK);
    expect(loginBody.IsSuccess).toBe(true);
    expect(loginBody.ErrorMessage).toBe(null);

    const headers = loginResponse.headers();
    token = headers["authorization"]!;
    expect(token).toBeTruthy();

    const productData = generateproductData();
    const createProductResponse = await request.post(`${baseURL}${endpoints.products}`, {
      data: productData,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    const createProductBody = await createProductResponse.json();
    await validateResponse(createProductResponse, {
      status: STATUS_CODES.CREATED,
      schema: createProductSchema,
      IsSuccess: true,
      ErrorMessage: null
    });
    const actualProductData = createProductBody.Product;
    expect(_.omit(actualProductData, ["_id", "createdOn"])).toEqual(productData);

    id = actualProductData._id;

    const getProductsAllResponse = await request.get(`${baseURL}${endpoints.productsAll}`, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    await validateResponse(getProductsAllResponse, {
      status: STATUS_CODES.OK,
      schema: getProductsAllSchema,
      IsSuccess: true,
      ErrorMessage: null
    });

    const getProductsAllResponseBody = await getProductsAllResponse.json();
    const objectInArray = await getProductsAllResponseBody["Products"].find(
      (object: IProductFromResponse) => object._id === id
    );
    expect(_.omit(objectInArray, ["_id", "createdOn"])).toEqual(productData);
  });
});
