import { apiConfig } from "src/config/apiConfig";
import { IRequestOptions } from "src/data/types/core.types";
import { ICredentials, ILoginResponse } from "src/data/types/credentials.types";
import { IApiClient } from "../apiClients/types";

export class LoginApi {
  constructor(private apiClient: IApiClient) {}

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
