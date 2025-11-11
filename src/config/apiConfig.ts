import { SALES_PORTAL_API_URL } from "./env";

export const apiConfig = {
  baseURL: SALES_PORTAL_API_URL,
  endpoints: {
    login: "/api/login",
    products: "/api/products",
    productById: (id: string) => `/api/products/${id}`,
    productsAll: "/api/products/all"
  }
};
