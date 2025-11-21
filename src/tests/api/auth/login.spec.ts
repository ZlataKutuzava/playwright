import { test, expect } from "src/fixtures/api.fixture";
import { credentials } from "src/config/env";
import { userLoginSchema } from "src/data/schemas/auth/login.schema";
import { STATUS_CODES } from "src/data/statusCodes";
import { validateResponse } from "src/utils/validateResponse.utils";

test.describe("[API] [Sales Portal] [Login]", () => {
  test("Login as ADMIN user", async ({ loginApi }) => {
    const loginResponse = await loginApi.login(credentials);

    const headers = loginResponse.headers;
    const token = headers["authorization"]!;
    expect(token).toBeTruthy();

    validateResponse(loginResponse, {
      status: STATUS_CODES.OK,
      schema: userLoginSchema,
      IsSuccess: true,
      ErrorMessage: null
    });
  });
});
