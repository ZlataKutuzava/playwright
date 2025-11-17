import { test, expect } from "src/fixtures/api.fixture";
import { apiConfig } from "src/config/apiConfig";
import { credentials } from "src/config/env";
import { STATUS_CODES } from "src/data/statusCodes";
import { IProductFromResponse } from "src/data/types/product.types";

const { baseURL, endpoints } = apiConfig;

test.describe("[API] [Sales Portal] [Products]", () => {
  test("Delete Product", async ({ loginApiService, productsApiService, productsApi }) => {
    const token = await loginApiService.loginAsAdmin();
    const createdProduct = await productsApiService.create(token!);
    const id = createdProduct._id;
    const response = await productsApi.delete(id, token!);
    expect(response.status).toBe(STATUS_CODES.DELETED);
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
