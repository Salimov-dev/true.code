import { httpService } from "./http.service";
import { IProduct } from "@interfaces/product.interface";

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
  }
};

export default productService;
