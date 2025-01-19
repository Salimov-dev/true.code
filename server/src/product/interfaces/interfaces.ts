export interface IProductFindWithFilters {
  page?: number;
  limit?: number;
  filters?: Record<string, string | number | boolean>;
  sort?: string;
  order?: 'asc' | 'desc';
}
