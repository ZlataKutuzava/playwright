import { expect, test } from "src/fixtures/business.fixture";
import { NOTIFICATIONS } from "src/data/salesPortal/notifications";
import { TAGS } from "src/data/types/tags";

test.describe("[Sales Portal] [Add new Customer]", async () => {
  let id = "";
  let token = "";
  test.afterEach(async ({ customersApiService }) => {
    if (id) await customersApiService.delete(token, id);
    id = "";
  });
  test(
    "Add new customer with services",
    {
      tag: [TAGS.REGRESSION, TAGS.UI, TAGS.VISUAL_REGRESSION]
    },
    async ({ addNewCustomerUIService, customersListPage }) => {
      token = await customersListPage.getAuthToken();
      await addNewCustomerUIService.open();
      const createdCustomer = await addNewCustomerUIService.create();
      id = createdCustomer._id;
      await expect(customersListPage.toastMessage).toContainText(NOTIFICATIONS.CUSTOMER_CREATED);
      await expect(customersListPage.customerInTableRow(createdCustomer.name)).toBeVisible();
    }
  );
});
