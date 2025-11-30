import { STATUS_CODES } from "src/data/statusCodes";
import { validateResponse } from "src/utils/validateResponse.utils";
import { CustomersApi } from "../api/customers.api";
import { logStep } from "src/utils/report/logStep.utils";

export class CustomersApiService {
  constructor(private customersApi: CustomersApi) {}

  @logStep("Delete customer via API")
  async delete(token: string, id: string) {
    const response = await this.customersApi.delete(id, token);
    validateResponse(response, {
      status: STATUS_CODES.DELETED
    });
  }
}
