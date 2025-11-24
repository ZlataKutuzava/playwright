import { IResponseFields } from "./core.types";

export interface IMetricsResponse extends IResponseFields {
  Metrics: IMetrics;
}

export interface IMetrics {
  orders: IOrders;
  customers: ICustomers;
  products: IProducts;
}

export interface IOrders {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  totalCanceledOrders: number;
  recentOrders: any;
  ordersCountPerDay: any;
}

export interface ICustomers {
  totalNewCustomers: number;
  topCustomers: any;
  customerGrowth: any;
}

export interface IProducts {
  topProducts: any;
}
