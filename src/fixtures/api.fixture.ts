import { test as base, expect } from "@playwright/test";
import { RequestApi } from "src/api/apiClients/requestApi";
import { ProductsApi } from "src/api/api/products.api";
import { LoginApi } from "src/api/api/login.api";
import { ProductsApiService } from "src/api/service/products.service";
import { LoginService } from "src/api/service/login.service";

interface IApi {
  // api
  productsApi: ProductsApi;
  loginApi: LoginApi;

  //services
  productsApiService: ProductsApiService;
  loginApiService: LoginService;
}

const test = base.extend<IApi>({
  productsApi: async ({ request }, use) => {
    const apiClient = new RequestApi(request);
    const api = new ProductsApi(apiClient);
    await use(api);
  },

  loginApi: async ({ request }, use) => {
    const apiClient = new RequestApi(request);
    const api = new LoginApi(apiClient);
    await use(api);
  },

  productsApiService: async ({ productsApi }, use) => {
    await use(new ProductsApiService(productsApi));
  },

  loginApiService: async ({ loginApi }, use) => {
    await use(new LoginService(loginApi));
  }
});

export { test, expect };
