import { MANUFACTURERS } from "../salesPortal/products/manufacturers";

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
