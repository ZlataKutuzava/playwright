import { SALES_PORTAL_URL } from "src/config/env";
import { metricsChecks, mockedMetricsData } from "src/data/salesPortal/metricsData.DDT";
import { TAGS } from "src/data/types/tags";
import { expect, test } from "src/fixtures/business.fixture";

test.describe("[Integration] [Sales Portal] [Metrics]", () => {
  test.beforeEach(async ({ mock, page, homePage }) => {
    await mock.metrics({
      IsSuccess: true,
      ErrorMessage: null,
      Metrics: mockedMetricsData
    });
    await page.goto(SALES_PORTAL_URL);
    await homePage.waitForOpened();
  });
  for (const { title, locator, expectedValue } of metricsChecks) {
    test(
      `[Metrics] ${title}`,
      {
        tag: [TAGS.REGRESSION, TAGS.UI, TAGS.VISUAL_REGRESSION]
      },
      async ({ homePage }) => {
        await expect(locator(homePage)).toHaveText(expectedValue);
      }
    );
  }
});
