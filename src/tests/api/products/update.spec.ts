import test, { expect } from "@playwright/test";
import _ from "lodash";
import { apiConfig } from "src/config/apiConfig";
import { credentials } from "src/config/env";
import { generateproductData } from "src/data/salesPortal/products/generateProductData";
import { createProductSchema } from "src/data/schemas/products/create.schema";
import { STATUS_CODES } from "src/data/statusCodes";
import { validateResponse } from "src/utils/validateResponse.utils";

const { baseURL, endpoints } = apiConfig;

test.describe("[API] [Sales Portal] [Products]", () => {
  let id = "";
  let token = "";
  test.afterEach(async ({ request }) => {
    const response = await request.delete(`${baseURL}${endpoints.productById(id)}`, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    expect(response.status()).toBe(STATUS_CODES.DELETED);
  });
  test("Update Product By Id", async ({ request }) => {
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
    expect(loginBody.User.username).toBe(credentials.username);

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

    const updatedProductData = generateproductData();

    const updatedProductResponse = await request.put(`${baseURL}${endpoints.productById(id)}`, {
      data: updatedProductData,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    const updateProductBody = await updatedProductResponse.json();
    await validateResponse(updatedProductResponse, {
      status: STATUS_CODES.OK,
      schema: createProductSchema,
      IsSuccess: true,
      ErrorMessage: null
    });
    expect(_.omit(updateProductBody.Product, ["_id", "createdOn"])).toEqual(updatedProductData);
    expect(id).toBe(updateProductBody.Product._id);
  });
});
