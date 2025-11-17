import { expect } from "@playwright/test";
import { IResponse, IResponseFields } from "src/data/types/core.types";
import { validateJsonSchema } from "./validateSchema.utils";

export function validateResponse<T extends IResponseFields | null>(
  response: IResponse<T>,
  expected: {
    status: number;
    IsSuccess?: boolean;
    ErrorMessage?: string | null;
    schema?: object;
  }
) {
  expect(response.status).toBe(expected.status);
  if (expected.IsSuccess) expect(response.body!.IsSuccess).toBe(expected.IsSuccess);
  if (expected.ErrorMessage) expect(response.body!.ErrorMessage).toBe(expected.ErrorMessage);
  if (expected.schema) validateJsonSchema(response.body!, expected.schema);
}
