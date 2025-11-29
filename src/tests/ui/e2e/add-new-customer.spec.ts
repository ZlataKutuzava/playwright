import { expect, test } from "src/fixtures/business.fixture";
import { NOTIFICATIONS } from "src/data/salesPortal/notifications";

test.describe("[Sales Portal] [Add new Customer]", async () => {
  let id = "";
  let token = "";
  test.afterEach(async ({ customersApiService }) => {
    if (id) await customersApiService.delete(token, id);
    id = "";
  });
  test("Add new customer with services", async ({ loginUIService, addNewCustomerUIService, customersListPage }) => {
    token = await loginUIService.loginAsAdmin();
    await addNewCustomerUIService.open();
    const createdCustomer = await addNewCustomerUIService.create();
    id = createdCustomer._id;
    await expect(customersListPage.toastMessage).toContainText(NOTIFICATIONS.CUSTOMER_CREATED);
    await expect(customersListPage.customerInTableRow(createdCustomer.name)).toBeVisible();
  });
});
