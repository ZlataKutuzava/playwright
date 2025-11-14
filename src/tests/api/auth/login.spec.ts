import test, { expect } from "@playwright/test";
import { apiConfig } from "src/config/apiConfig";
import { credentials } from "src/config/env";
import { userLoginSchema } from "src/data/schemas/auth/login.schema";
import { STATUS_CODES } from "src/data/statusCodes";
import { validateResponse } from "src/utils/validateResponse.utils";

const { baseURL, endpoints } = apiConfig;

test.describe("[API] [Sales Portal] [Login]", () => {
  test("Login as ADMIN user", async ({ request }) => {
    const loginResponse = await request.post(`${baseURL}${endpoints.login}`, {
      data: credentials,
      headers: {
        "content-type": "application/json"
      }
    });

    const headers = loginResponse.headers();
    const token = headers["authorization"]!;
    expect(token).toBeTruthy();

    await validateResponse(loginResponse, {
      status: STATUS_CODES.OK,
      schema: userLoginSchema,
      IsSuccess: true,
      ErrorMessage: null
    });
  });
});
