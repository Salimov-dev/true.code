export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  sku: string;
  images?: string[] | [] | null;
  userId: string;
}

export interface IProductImageUpload {
  productId: string;
  image: File | null;
}

export interface IProductImageDelete {
  productId: string;
}

export interface IProductFindWithFilters {
  page?: number;
  limit?: number;
  filters?: Record<string, string | number | boolean>;
  sort?: string;
  order?: "asc" | "desc";
}

export interface IProductFindWithFiltersReturn {
  products: IProduct[];
  total: number;
}
