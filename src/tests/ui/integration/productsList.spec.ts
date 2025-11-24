import { expect, test } from "src/fixtures/business.fixture";
import { SALES_PORTAL_URL } from "src/config/env";
import { generateProductResponseData } from "src/data/salesPortal/products/generateProductData";
import { apiConfig } from "src/config/apiConfig";
import { convertToDateAndTime } from "src/utils/date.utils";
import _ from "lodash";

test.describe("[Integration] [Sales Portal] [Products] [Table Sorting]", () => {
  test("Field: createdOn, direction, asc", async ({ loginAsAdmin, productsListPage, page, mock }) => {
    const product1 = generateProductResponseData();
    const product2 = generateProductResponseData();

    const products = [product1, product2];
    await mock.productsPage({
      Products: products,
      IsSuccess: true,
      ErrorMessage: null,
      total: 1,
      page: 1,
      limit: 10,
      search: "",
      manufacturer: [],
      sorting: {
        sortField: "createdOn",
        sortOrder: "desc"
      }
    });

    await loginAsAdmin();
    await page.goto(SALES_PORTAL_URL + "products");
    await productsListPage.waitForOpened();
    await mock.productsPage({
      Products: [product1, product2],
      IsSuccess: true,
      ErrorMessage: null,
      total: 1,
      page: 1,
      limit: 10,
      search: "",
      manufacturer: [],
      sorting: {
        sortField: "createdOn",
        sortOrder: "asc"
      }
    });

    const request = await productsListPage.interceptRequest(
      apiConfig.endpoints.products,
      productsListPage.clickTableHeader.bind(productsListPage),
      "Created On"
    );

    await productsListPage.clickTableHeader("Created On");
    expect(request.url()).toBe(
      `${apiConfig.baseURL}${apiConfig.endpoints.products}?sortField=createdOn&sortOrder=asc&page=1&limit=10`
    );
    expect(productsListPage.tableHeaderArrow("Created On", { direction: "asc" })).toBeVisible();

    const tableData = await productsListPage.getTableData();
    expect(tableData.length).toBe(products.length);
    tableData.forEach((product, i) => {
      const expected = _.omit(products[i], ["_id", "notes", "amount"]);
      expected.createdOn = convertToDateAndTime(expected.createdOn!);
      expect(product).toEqual(expected);
    });
  });
});
