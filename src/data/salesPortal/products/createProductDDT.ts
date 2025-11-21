import { IProduct } from "src/data/types/product.types";
import { faker } from "@faker-js/faker";

export const createProductPositiveChecks: {
  title: string;
  value: Partial<IProduct>;
}[] = [
  {
    title: "Name has length of 3 alphanumerical characters",
    value: {
      name: faker.string.alphanumeric({ length: 3 })
    }
  },
  {
    title: "Name has length of 40 alphanumerical characters",
    value: {
      name: faker.string.alphanumeric({ length: 40 })
    }
  },
  {
    title: "Name with a single space between words",
    value: {
      name: `${faker.string.alphanumeric({ length: 10 })} ${faker.string.alphanumeric({ length: 10 })}`
    }
  },
  {
    title: "Price is 1",
    value: {
      price: 1
    }
  },
  {
    title: "Price is 99999",
    value: {
      price: 99999
    }
  },
  {
    title: "Amount is 0",
    value: {
      amount: 0
    }
  },
  {
    title: "Amount is 999",
    value: {
      amount: 999
    }
  },
  {
    title: "Notes length is 0",
    value: {
      notes: faker.string.alphanumeric({ length: 0 })
    }
  },
  {
    title: "Notes length is 250",
    value: {
      notes: faker.string.alphanumeric({ length: 250 })
    }
  }
];

export const createProductNegativeChecks: {
  title: string;
  value: Partial<IProduct>;
}[] = [
  {
    title: "Name has length of 2 alphanumerical characters",
    value: {
      name: faker.string.alphanumeric({ length: 2 })
    }
  },
  {
    title: "Name has length of 41 alphanumerical characters",
    value: {
      name: faker.string.alphanumeric({ length: 41 })
    }
  },
  {
    title: "Name with a two spaces between words",
    value: {
      name: `${faker.string.alphanumeric({ length: 10 })}  ${faker.string.alphanumeric({ length: 10 })}`
    }
  },
  {
    title: "Name is empty",
    value: {
      name: ""
    }
  },
  {
    title: "Price is 0",
    value: {
      price: 0
    }
  },
  {
    title: "Price is over 99999",
    value: {
      price: 100000
    }
  },
  {
    title: "Amount is over 999",
    value: {
      amount: 1000
    }
  },
  {
    title: "Notes length is over 250",
    value: {
      notes: faker.string.alphanumeric({ length: 251 })
    }
  },
  {
    title: "Notes input contains >",
    value: {
      notes: `${faker.string.alphanumeric({ length: 10 })}>`
    }
  },
  {
    title: "Notes input contains <",
    value: {
      notes: `${faker.string.alphanumeric({ length: 10 })}<`
    }
  }
];
