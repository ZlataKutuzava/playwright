import { MANUFACTURERS } from "../salesPortal/products/manufacturers";
import { ID, IResponseFields } from "./core.types";

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

export interface ICreatedOn {
  createdOn: string;
}

export interface IProductFromResponse extends Required<IProduct>, ICreatedOn, ID {}

export interface IProductResponse extends IResponseFields {
  Product: IProductFromResponse;
}
