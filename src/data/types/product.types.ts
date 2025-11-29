import { MANUFACTURERS } from "../salesPortal/products/manufacturers";
import { ICreatedOn, ID, IResponseFields, SortOrder } from "./core.types";

export interface IProduct {
  name: string;
  manufacturer: MANUFACTURERS;
  price: number;
  amount: number;
  notes?: string;
}

export interface IProductInTableRow extends Pick<IProduct, "name" | "price" | "manufacturer"> {
  createdOn: string;
}

export interface IProductFromResponse extends Required<IProduct>, ICreatedOn, ID {}

export interface IProductDetailsModal extends Required<IProduct>, ICreatedOn {}

export interface IProductResponse extends IResponseFields {
  Product: IProductFromResponse;
}

export interface IProductsResponse extends IResponseFields {
  Products: IProductFromResponse[];
}

export interface IProductsSortedResponse extends IProductsResponse {
  total: number;
  page: number;
  limit: number;
  search: string;
  manufacturer: string[];
  sorting: {
    sortField: ProductsSortField;
    sortOrder: SortOrder;
  };
}

export type ProductsSortField = "createdOn" | "manufacturer" | "price" | "name";
