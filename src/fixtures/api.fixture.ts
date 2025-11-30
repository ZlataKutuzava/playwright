import { test as base, expect } from "@playwright/test";
import { RequestApi } from "src/api/apiClients/requestApi";
import { ProductsApi } from "src/api/api/products.api";
import { LoginApi } from "src/api/api/login.api";
import { ProductsApiService } from "src/api/service/products.service";
import { LoginService } from "src/api/service/login.service";
import { CustomersApi } from "src/api/api/customers.api";
import { CustomersApiService } from "src/api/service/customers.service";

export interface IApi {
  // api
  productsApi: ProductsApi;
  loginApi: LoginApi;
  customersApi: CustomersApi;

  //services
  productsApiService: ProductsApiService;
  loginApiService: LoginService;
  customersApiService: CustomersApiService;
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

  customersApi: async ({ request }, use) => {
    const apiClient = new RequestApi(request);
    const api = new CustomersApi(apiClient);
    await use(api);
  },

  productsApiService: async ({ productsApi }, use) => {
    await use(new ProductsApiService(productsApi));
  },

  loginApiService: async ({ loginApi }, use) => {
    await use(new LoginService(loginApi));
  },

  customersApiService: async ({ customersApi }, use) => {
    await use(new CustomersApiService(customersApi));
  }
});

export { test, expect };
