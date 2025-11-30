import { apiConfig } from "src/config/apiConfig";
import { IRequestOptions } from "src/data/types/core.types";
import { ICredentials, ILoginResponse } from "src/data/types/credentials.types";
import { IApiClient } from "../apiClients/types";
import { logStep } from "src/utils/report/logStep.utils";

export class LoginApi {
  constructor(private apiClient: IApiClient) {}

  @logStep("POST /api/login")
  async login(credentials: ICredentials) {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseURL,
      url: apiConfig.endpoints.login,
      method: "post",
      headers: {
        "content-type": "application/json"
      },
      data: credentials
    };
    return await this.apiClient.send<ILoginResponse>(options);
  }
}
