import { metricsChecks, mockedMetricsData } from "src/data/salesPortal/metricsData.DDT";
import { expect, test } from "src/fixtures/business.fixture";

test.describe("[Integration] [Sales Portal] [Metrics]", () => {
  test.beforeEach(async ({ loginAsAdmin, mock, homePage }) => {
    await mock.metrics({
      IsSuccess: true,
      ErrorMessage: null,
      Metrics: mockedMetricsData
    });
    await loginAsAdmin();
    await homePage.waitForOpened();
  });

  for (const { title, locator, expectedValue } of metricsChecks) {
    test(`[Metrics] ${title}`, async ({ homePage }) => {
      await expect(locator(homePage)).toHaveText(expectedValue);
    });
  }
});
