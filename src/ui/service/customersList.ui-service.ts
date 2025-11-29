import { Page } from "@playwright/test";
import { CustomersListPage, AddNewCustomerPage } from "../pages/customers";

export class CustomersListUIService {
  customersListPage: CustomersListPage;
  addNewCustomerPage: AddNewCustomerPage;

  constructor(private page: Page) {
    this.customersListPage = new CustomersListPage(page);
    this.addNewCustomerPage = new AddNewCustomerPage(page);
  }

  async open() {
    await this.customersListPage.open("customers");
    await this.customersListPage.waitForOpened();
  }

  async openAddNewCustomerPage() {
    await this.customersListPage.clickAddNewCustomer;
    await this.addNewCustomerPage.waitForOpened();
  }
}
