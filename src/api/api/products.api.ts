import { apiConfig } from "src/config/apiConfig";
import { IRequestOptions } from "src/data/types/core.types";
import { IProduct, IProductResponse, IProductsResponse } from "src/data/types/product.types";
import { IApiClient } from "../apiClients/types";
import { logStep } from "src/utils/report/logStep.utils";

export class ProductsApi {
  constructor(private apiClient: IApiClient) {}

  @logStep("POST /api/products")
  async create(product: IProduct, token: string) {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseURL, //backend url
      url: apiConfig.endpoints.products, //endpoint
      method: "post",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`
      },
      data: product
    };
    return await this.apiClient.send<IProductResponse>(options);
  }

  @logStep("PUT /api/products")
  async update(_id: string, newProduct: IProduct, token: string) {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseURL,
      url: apiConfig.endpoints.productById(_id),
      method: "put",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`
      },
      data: newProduct
    };
    return await this.apiClient.send<IProductResponse>(options);
  }

  @logStep("GET /api/products/$id")
  async getById(_id: string, token: string) {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseURL,
      url: apiConfig.endpoints.productById(_id),
      method: "get",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`
      }
    };
    return await this.apiClient.send<IProductResponse>(options);
  }

  @logStep("GET /api/products")
  async getAll(token: string) {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseURL,
      url: apiConfig.endpoints.productsAll,
      method: "get",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`
      }
    };
    return await this.apiClient.send<IProductsResponse>(options);
  }

  @logStep("DELETE /api/products/$id")
  async delete(_id: string, token: string) {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseURL,
      url: apiConfig.endpoints.productById(_id),
      method: "delete",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`
      }
    };
    return await this.apiClient.send<IProductResponse>(options);
  }
}
