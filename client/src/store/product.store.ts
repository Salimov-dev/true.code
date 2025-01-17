import { create } from "zustand";

import { handleHttpError } from "@utils/errors/handle-http.error";
import { IProduct } from "@interfaces/product.interface";
import productService from "@services/product.service";
import { notification } from "antd";

interface IUseProductStore {
  products: IProduct[];
  isLoading: boolean;
  error: null | unknown;
  fetchProducts: () => void;
  fetchProductById: (id: string) => Promise<IProduct | null>;
  createProduct: (Product: Partial<IProduct>) => Promise<IProduct>;
  updateProduct: (id: string, Product: Partial<IProduct>) => Promise<IProduct>;
  deleteProduct: (id: string) => void;
}

const useProductStore = create<IUseProductStore>((set) => ({
  products: [],
  isLoading: false,
  error: null,

  fetchProducts: () => {
    set({ isLoading: true, error: null });
    productService
      .findAll()
      .then((products) => set({ products }))
      .catch((error) => {
        handleHttpError(error, "Ошибка при загрузке списка товаров");
        set({ error });
      })
      .finally(() => set({ isLoading: false }));
  },

  fetchProductById: async (id: string) => {
    set({ isLoading: true, error: null });
    return productService
      .findById(id)
      .then((product) => product)
      .catch((error) => {
        handleHttpError(error, "Ошибка при загрузке товара");
        set({ error });
        return null;
      })
      .finally(() => set({ isLoading: false }));
  },

  createProduct: async (product: Partial<IProduct>) => {
    set({ isLoading: true, error: null });
    return productService
      .create(product)
      .then((newProduct) => {
        set((state) => ({ products: [...state.products, newProduct] }));
        notification.success({
          message: "Товар успешно добавлен",
          description: `Товар под именем ${newProduct.name} создан`
        });
        return newProduct;
      })
      .catch((error) => {
        handleHttpError(error, "Ошибка при создании товара", true);
        set({ error });
        return null;
      })
      .finally(() => set({ isLoading: false }));
  },

  updateProduct: async (id: string, Product: Partial<IProduct>) => {
    set({ isLoading: true, error: null });
    return productService
      .update(id, Product)
      .then((updatedProduct) => {
        set((state) => ({
          products: state.products.map((product) =>
            product.id === id ? updatedProduct : product
          )
        }));
        return updatedProduct;
      })
      .catch((error) => {
        handleHttpError(error, "Ошибка при обновлении товара");
        set({ error });
        return null;
      })
      .finally(() => set({ isLoading: false }));
  },

  deleteProduct: (id: string) => {
    set({ isLoading: true, error: null });
    productService
      .remove(id)
      .then(() => {
        set((state) => ({
          products: state.products.filter((product) => product.id !== id)
        }));
      })
      .catch((error) => {
        handleHttpError(error, "Ошибка при удалении товара");
        set({ error });
      })
      .finally(() => set({ isLoading: false }));
  }
}));

export default useProductStore;
