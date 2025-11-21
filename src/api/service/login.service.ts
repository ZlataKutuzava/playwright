import { credentials } from "src/config/env";
import { LoginApi } from "../api/login.api";
import { expect } from "@playwright/test";
import { ICredentials } from "src/data/types/credentials.types";
import { validateResponse } from "src/utils/validateResponse.utils";
import { STATUS_CODES } from "src/data/statusCodes";

export class LoginService {
  constructor(private loginApi: LoginApi) {}

  async loginAsAdmin(customCredentials?: ICredentials) {
    const response = await this.loginApi.login(customCredentials ?? credentials);
    validateResponse(response, {
      status: STATUS_CODES.OK,
      IsSuccess: true,
      ErrorMessage: null
    });
    const headers = response.headers;
    const token = headers["authorization"];
    expect(token).toBeTruthy();

    return token;
  }
}
