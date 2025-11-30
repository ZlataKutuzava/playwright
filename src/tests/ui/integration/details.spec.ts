import { test } from "src/fixtures/business.fixture";
import { SALES_PORTAL_URL } from "src/config/env";
import { generateProductResponseData } from "src/data/salesPortal/products/generateProductData";
import { Mock } from "src/mock/mock";
import { TAGS } from "src/data/types/tags";

test.describe("[Integration] [Sales Portal] [Products]", () => {
  test(
    "Product Details",
    {
      tag: [TAGS.REGRESSION, TAGS.UI, TAGS.VISUAL_REGRESSION]
    },
    async ({ page, productsListPage }) => {
      const expectedProductResponse = generateProductResponseData();
      const mock = new Mock(page);
      await mock.productsPage({
        Products: [expectedProductResponse],
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
      await mock.productDetailsModal({
        Product: expectedProductResponse,
        IsSuccess: true,
        ErrorMessage: null
      });
      await page.goto(SALES_PORTAL_URL + "products");
      await productsListPage.waitForOpened();
      await productsListPage.clickAction(expectedProductResponse.name, "details");
    }
  );
});
