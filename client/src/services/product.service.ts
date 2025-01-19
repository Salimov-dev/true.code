import { httpService } from "./http.service";
import {
  IProduct,
  IProductFindWithFilters,
  IProductFindWithFiltersReturn
} from "@interfaces/product.interface";

const productEndPoint = "product/";

const productService = {
  create: async (product: Partial<IProduct>): Promise<IProduct> => {
    const { data } = await httpService.post(productEndPoint, product);
    return data;
  },

  findAll: async (): Promise<IProduct[]> => {
    const { data } = await httpService.get(`${productEndPoint}find-all`);
    return data;
  },

  findByName: async (name: string): Promise<IProduct> => {
    const { data } = await httpService.get(
      `${productEndPoint}find-by-name/${name}`
    );
    return data;
  },

  findById: async (id: string): Promise<IProduct> => {
    const { data } = await httpService.get(
      `${productEndPoint}find-by-id/${id}`
    );
    return data;
  },

  update: async (id: string, user: Partial<IProduct>): Promise<IProduct> => {
    const { data } = await httpService.patch(`${productEndPoint}${id}`, user);
    return data;
  },

  remove: async (id: string): Promise<void> => {
    await httpService.delete(`${productEndPoint}${id}`);
  },

  findWithFilters: async ({
    page = 1,
    limit = 8,
    sort = "createdAt",
    order = "asc",
    filters = {}
  }: IProductFindWithFilters): Promise<IProductFindWithFiltersReturn> => {
    const params = {
      page,
      limit,
      sort,
      order,
      filters: JSON.stringify(filters)
    };

    const { data } = await httpService.get(
      `${productEndPoint}find-with-filters`,
      { params }
    );

    return data;
  },

  generateRandomProducts: async (limit: number) => {
    const { data } = await httpService.post(
      `${productEndPoint}generate-random-products`,
      { limit }
    );
    return data;
  }
};

export default productService;
