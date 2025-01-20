import { IProductFindWithFilters } from "@interfaces/product.interface";

export const DEFAULT_PAGINATION: IProductFindWithFilters = {
  page: 1,
  limit: 8,
  filters: {},
  sort: "createdAt",
  order: "desc" as "desc" | "asc"
};
