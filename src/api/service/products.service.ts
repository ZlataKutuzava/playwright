import { generateproductData } from "src/data/salesPortal/products/generateProductData";
import { createProductSchema } from "src/data/schemas/products/create.schema";
import { STATUS_CODES } from "src/data/statusCodes";
import { IProduct } from "src/data/types/product.types";
import { validateResponse } from "src/utils/validateResponse.utils";
import { ProductsApi } from "../api/products.api";

export class ProductsApiService {
  constructor(private productsApi: ProductsApi) {}
  async create(token: string, productData?: IProduct) {
    const data = generateproductData(productData);
    const response = await this.productsApi.create(data, token);
    validateResponse(response, {
      status: STATUS_CODES.CREATED,
      IsSuccess: true,
      ErrorMessage: null,
      schema: createProductSchema
    });
    return response.body.Product;
  }

  async delete(token: string, id: string) {
    const response = await this.productsApi.delete(id, token);
    validateResponse(response, {
      status: STATUS_CODES.DELETED
    });
  }
}
