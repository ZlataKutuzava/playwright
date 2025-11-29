import { STATUS_CODES } from "src/data/statusCodes";
import { validateResponse } from "src/utils/validateResponse.utils";
import { CustomersApi } from "../api/customers.api";

export class CustomersApiService {
  constructor(private customersApi: CustomersApi) {}

  async delete(token: string, id: string) {
    const response = await this.customersApi.delete(id, token);
    validateResponse(response, {
      status: STATUS_CODES.DELETED
    });
  }
}
