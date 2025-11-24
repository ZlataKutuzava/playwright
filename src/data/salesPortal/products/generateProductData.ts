import { IProduct, IProductFromResponse } from "src/data/types/product.types";
import { faker } from "@faker-js/faker";
import { getRandomEnumValue } from "src/utils/enum.utils";
import { MANUFACTURERS } from "./manufacturers";
import { ObjectId } from "bson";

export function generateproductData(params?: Partial<IProduct>): IProduct {
  return {
    name: faker.commerce.product() + faker.number.int({ min: 1, max: 100000 }),
    amount: faker.number.int({ min: 0, max: 999 }),
    price: faker.number.int({ min: 1, max: 99999 }),
    manufacturer: getRandomEnumValue(MANUFACTURERS),
    notes: faker.string.alphanumeric({ length: 250 }),
    ...params
  };
}

export function generateProductResponseData(params?: Partial<IProduct>): IProductFromResponse {
  const initial = generateproductData(params);
  return {
    _id: new ObjectId().toHexString(),
    name: initial.name,
    amount: initial.amount,
    price: initial.price,
    manufacturer: initial.manufacturer,
    createdOn: "2025-11-22T17:46:51.000Z",
    notes: initial.notes!
  };
}
