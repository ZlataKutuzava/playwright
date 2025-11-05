import { IProduct } from "src/data/types/product.types";
import { faker } from "@faker-js/faker";
import { getRandomEnumValue } from "src/utils/enum.utils";
import { MANUFACTURERS } from "./manufacturers";

export function generateproductData(params?: Partial<IProduct>): IProduct {
  return {
    name: faker.commerce.product() + faker.number.int({ min: 1, max: 100000 }),
    price: faker.number.int({ min: 1, max: 99999 }),
    manufacturer: getRandomEnumValue(MANUFACTURERS),
    amount: faker.number.int({ min: 0, max: 999 }),
    notes: faker.string.alphanumeric({ length: 250 }),
    ...params
  };
}
