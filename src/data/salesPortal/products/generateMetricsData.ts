import { faker } from "@faker-js/faker";
import { IMetrics } from "src/data/types/metrics.types";

export function generateMetricsData(params?: Partial<IMetrics>): IMetrics {
  return {
    orders: {
      totalRevenue: faker.number.int({ min: 0, max: 10000 }),
      totalOrders: faker.number.int({ min: 0, max: 100 }),
      averageOrderValue: faker.number.int({ min: 0, max: 100 }),
      totalCanceledOrders: faker.number.int({ min: 0, max: 100 }),
      recentOrders: [],
      ordersCountPerDay: [],
      ...params?.orders
    },
    customers: {
      totalNewCustomers: faker.number.int({ min: 0, max: 100 }),
      topCustomers: [],
      customerGrowth: [],
      ...params?.customers
    },
    products: {
      topProducts: [],
      ...params?.products
    }
  };
}
