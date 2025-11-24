import { generateMetricsData } from "src/data/salesPortal/products/generateMetricsData";
import { expect, test } from "src/fixtures/business.fixture";

test.describe("[Integration] [Sales Portal] [Metrics]", () => {
  const mockedMetricsData = generateMetricsData();
  const totalOrders = mockedMetricsData.orders.totalOrders;
  const totalCancelledOrders = mockedMetricsData.orders.totalCanceledOrders;
  const newCustomers = mockedMetricsData.customers.totalNewCustomers;
  test.beforeEach(async ({ loginAsAdmin, mock, homePage }) => {
    await mock.metrics({
      IsSuccess: true,
      ErrorMessage: null,
      Metrics: mockedMetricsData
    });
    await loginAsAdmin();
    await homePage.waitForOpened();
  });
  test("Orders this Year", async ({ homePage }) => {
    expect(homePage.ordersThisYear).toHaveText(totalOrders.toString());
  });
  test("New Customers", async ({ homePage }) => {
    expect(homePage.newCustomers).toHaveText(newCustomers.toString());
  });
  test("Cancelled Orders", async ({ homePage }) => {
    expect(homePage.cancelledOrders).toHaveText(totalCancelledOrders.toString());
  });
});
