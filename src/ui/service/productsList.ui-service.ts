import { expect, Page } from "@playwright/test";
import { ProductsListPage } from "../pages/products/productsList.page";
import { AddNewProductPage } from "../pages/products/addNewProduct.page";
import { IProductDetailsModal } from "src/data/types/product.types";
import _ from "lodash";
import { convertToFullDateAndTime } from "src/utils/date.utils";
import { EditProductPage } from "../pages/products/editProduct.page";
import { logStep } from "src/utils/report/logStep.utils";

export class ProductsListUIService {
  productsListPage: ProductsListPage;
  addNewProductPage: AddNewProductPage;
  editProductPage: EditProductPage;
  constructor(private page: Page) {
    this.productsListPage = new ProductsListPage(page);
    this.addNewProductPage = new AddNewProductPage(page);
    this.editProductPage = new EditProductPage(page);
  }

  @logStep("Open Products List Page")
  async open() {
    await this.productsListPage.open("products");
    await this.productsListPage.waitForOpened();
  }

  @logStep("Open Add new Product Page")
  async openAddNewProductPage() {
    await this.productsListPage.clickAddNewProduct();
    await this.addNewProductPage.waitForOpened();
  }

  @logStep("Open Details Products Modal on Products List Page")
  async openDetailsModal(productName: string) {
    await this.productsListPage.detailsButton(productName).click();
    await this.productsListPage.detailsModal.waitForOpened();
  }

  @logStep("Open Delete Products on Products List Page")
  async deleteProduct(productName: string) {
    await this.productsListPage.clickAction(productName, "delete");
    await this.productsListPage.deleteModal.waitForOpened();
    await this.productsListPage.deleteModal.clickConfirm();
    await this.productsListPage.deleteModal.waitForClosed();
  }

  @logStep("Edit Product on Products List Page")
  async editProduct(productName: string) {
    await this.productsListPage.clickAction(productName, "edit");
    await this.editProductPage.waitForOpened();
  }

  assertDetailsData(
    actual: IProductDetailsModal,
    expected: IProductDetailsModal
  ) {
    expect(actual).toEqual({
      ..._.omit(expected, ["_id"]),
      createdOn: convertToFullDateAndTime(expected.createdOn)
    });
  }
}
