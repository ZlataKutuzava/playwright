import test, { expect } from "@playwright/test";
import { apiConfig } from "src/config/apiConfig";
import { credentials } from "src/config/env";
import { generateproductData } from "src/data/salesPortal/products/generateProductData";
import { createProductSchema } from "src/data/schemas/products/create.schema";
import { STATUS_CODES } from "src/data/statusCodes";
import { IProductFromResponse } from "src/data/types/product.types";
import { validateResponse } from "src/utils/validateResponse.utils";

const { baseURL, endpoints } = apiConfig;

test.describe("[API] [Sales Portal] [Products]", () => {
  test("Delete Product", async ({ request }) => {
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
    const token = headers["authorization"]!;
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

    const id = actualProductData._id;

    await validateResponse(createProductResponse, {
      status: STATUS_CODES.CREATED,
      schema: createProductSchema,
      IsSuccess: true,
      ErrorMessage: null
    });
    const response = await request.delete(`${baseURL}${endpoints.productById(id)}`, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    expect(response.status()).toBe(STATUS_CODES.DELETED);
  });
  test.skip("Delete all products", async ({ request }) => {
    const loginResponse = await request.post(`${baseURL}${endpoints.login}`, {
      data: credentials,
      headers: {
        "content-type": "application/json"
      }
    });
    const headers = loginResponse.headers();
    const token = headers["authorization"]!;

    const productsResponse = await request.get(`${baseURL}${endpoints.productsAll}`, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    const body = await productsResponse.json();
    const ids = body.Products.map((product: IProductFromResponse) => product._id);
    for (const id of ids) {
      const response = await request.delete(`${baseURL}${endpoints.productById(id)}`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      expect.soft(response.status()).toBe(STATUS_CODES.DELETED);
    }
  });
});
