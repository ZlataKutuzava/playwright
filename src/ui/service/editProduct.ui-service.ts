import { expect, Page } from "@playwright/test";
import { EditProductPage, ProductsListPage } from "../pages/products";
import { IProduct, IProductResponse } from "src/data/types/product.types";
import { generateproductData } from "src/data/salesPortal/products/generateProductData";
import { apiConfig } from "src/config/apiConfig";
import { STATUS_CODES } from "src/data/statusCodes";
import _ from "lodash";
import { logStep } from "src/utils/report/logStep.utils";

export class EditProductUIService {
  productsListPage: ProductsListPage;
  editProductPage: EditProductPage;
  constructor(private page: Page) {
    this.productsListPage = new ProductsListPage(page);
    this.editProductPage = new EditProductPage(page);
  }

  @logStep("Open Edit Product Page")
  async open() {
    await this.editProductPage.open("products/add");
    await this.editProductPage.waitForOpened();
  }

  @logStep("Update Product")
  async edit(productData?: Partial<IProduct>) {
    const data = generateproductData(productData);
    await this.editProductPage.fillForm(data);
    const response = await this.editProductPage.interceptResponse<
      IProductResponse,
      any
    >(
      apiConfig.endpoints.products,
      this.editProductPage.submitProductUpdate.bind(this.editProductPage)
    );
    expect(response.status).toBe(STATUS_CODES.OK);
    expect(_.omit(response.body.Product, "_id", "createdOn")).toEqual(data);
    await this.productsListPage.waitForOpened();
    return response.body.Product;
  }
}
