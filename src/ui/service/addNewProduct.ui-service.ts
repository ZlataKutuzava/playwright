import { expect, Page } from "playwright/test";
import { AddNewProductPage, ProductsListPage } from "../pages/products";
import { generateproductData } from "src/data/salesPortal/products/generateProductData";
import { IProduct, IProductResponse } from "src/data/types/product.types";
import { apiConfig } from "src/config/apiConfig";
import { STATUS_CODES } from "src/data/statusCodes";
import _ from "lodash";
import { logStep } from "src/utils/report/logStep.utils";

export class AddNewProductUIService {
  addNewProductPage: AddNewProductPage;
  productsListPage: ProductsListPage;

  constructor(private page: Page) {
    this.addNewProductPage = new AddNewProductPage(page);
    this.productsListPage = new ProductsListPage(page);
  }

  @logStep("Open Add New Product Page")
  async open() {
    await this.addNewProductPage.open("products/add");
    await this.addNewProductPage.waitForOpened();
  }

  @logStep("Create a New Product")
  async create(productData?: Partial<IProduct>) {
    const data = generateproductData(productData);
    await this.addNewProductPage.fillForm(data);
    const response = await this.addNewProductPage.interceptResponse<IProductResponse, any>(
      apiConfig.endpoints.products,
      this.addNewProductPage.clickSaveButton.bind(this.addNewProductPage)
    );
    expect(response.status).toBe(STATUS_CODES.CREATED);
    expect(_.omit(response.body.Product, "_id", "createdOn")).toEqual(data);
    await this.productsListPage.waitForOpened();
    return response.body.Product;
  }
}
