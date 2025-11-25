import { generateMetricsData } from "./products/generateMetricsData";

export const mockedMetricsData = generateMetricsData();
export const { totalOrders, totalCanceledOrders } = mockedMetricsData.orders;
export const { totalNewCustomers } = mockedMetricsData.customers;

export const metricsChecks = [
  {
    title: "Orders this Year",
    locator: (homePage: any) => homePage.ordersThisYear,
    expectedValue: totalOrders.toString()
  },
  {
    title: "New Customers",
    locator: (homePage: any) => homePage.newCustomers,
    expectedValue: totalNewCustomers.toString()
  },
  {
    title: "Cancelled Orders",
    locator: (homePage: any) => homePage.cancelledOrders,
    expectedValue: totalCanceledOrders.toString()
  }
];
