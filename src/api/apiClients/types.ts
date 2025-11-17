import { IRequestOptions, IResponse } from "src/data/types/core.types";

export interface IApiClient {
  send: <T extends object | null>(options: IRequestOptions) => Promise<IResponse<T>>;
}
