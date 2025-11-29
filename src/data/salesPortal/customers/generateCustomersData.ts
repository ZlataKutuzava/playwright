import { faker } from "@faker-js/faker";
import { COUNTRIES } from "./countries";
import { getRandomEnumValue } from "src/utils/enum.utils";
import { ICustomer } from "src/data/types/customer.types";

export function generateCustomerData(params?: Partial<ICustomer>): ICustomer {
  return {
    email: faker.internet.email(),
    name: `${faker.person.firstName()} ${faker.person.lastName()}`,
    country: getRandomEnumValue(COUNTRIES),
    city: faker.location.city(),
    street: faker.person.lastName(),
    house: faker.number.int({ min: 0, max: 200 }),
    flat: faker.number.int({ min: 0, max: 200 }),
    phone: `+${faker.number.int({ min: 1000000000, max: 999999999999999 })}`,
    notes: faker.string.alphanumeric({ length: 250 }),
    ...params
  };
}
