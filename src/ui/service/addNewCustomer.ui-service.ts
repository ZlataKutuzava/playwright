import { expect, Page } from "@playwright/test";
import { AddNewCustomerPage, CustomersListPage } from "../pages/customers";
import { ICustomer, ICustomerResponse } from "src/data/types/customer.types";
import { generateCustomerData } from "src/data/salesPortal/customers/generateCustomersData";
import { apiConfig } from "src/config/apiConfig";
import { STATUS_CODES } from "src/data/statusCodes";
import _ from "lodash";
import { logStep } from "src/utils/report/logStep.utils";

export class AddNewCustomerUIService {
  customersListPage: CustomersListPage;
  addNewCustomerPage: AddNewCustomerPage;

  constructor(private page: Page) {
    this.customersListPage = new CustomersListPage(page);
    this.addNewCustomerPage = new AddNewCustomerPage(page);
  }

  @logStep("Open Add New Customer Page")
  async open() {
    await this.addNewCustomerPage.open("customers/add");
    await this.addNewCustomerPage.waitForOpened();
  }

  @logStep("Create New Customer")
  async create(customerData?: Partial<ICustomer>) {
    const data = generateCustomerData(customerData);
    await this.addNewCustomerPage.fillForm(data);
    const response = await this.addNewCustomerPage.interceptResponse<ICustomerResponse, any>(
      apiConfig.endpoints.customers,
      this.addNewCustomerPage.clickSaveButton.bind(this.addNewCustomerPage)
    );
    expect(response.status).toBe(STATUS_CODES.CREATED);
    expect(_.omit(response.body.Customer, "_id", "createdOn")).toEqual(data);
    await this.customersListPage.waitForOpened();
    return response.body.Customer;
  }
}
