import { create } from "zustand";
import { notification } from "antd";
import { handleHttpError } from "@utils/errors/handle-http.error";
import productService from "@services/product.service";
import { DEFAULT_PAGINATION } from "@config/pagination.config";
import {
  IProduct,
  IProductFindWithFilters
} from "@interfaces/product.interface";

interface IUseProductStore {
  products: IProduct[];
  total: number;
  isLoading: boolean;
  isLoadingGenerateRandomProducts: boolean;
  isLoadingFetchProductsWithFilters: boolean;
  error: null | unknown;
  fetchProducts: () => void;
  fetchProductById: (id: string) => Promise<IProduct | null>;
  createProduct: (Product: Partial<IProduct>) => Promise<IProduct>;
  updateProduct: (id: string, product: Partial<IProduct>) => Promise<IProduct>;
  deleteProduct: (id: string, filters: IProductFindWithFilters) => void;
  fetchProductsWithFilters: (filters: IProductFindWithFilters) => void;
  generateRandomProducts: () => void;
}

const useProductStore = create<IUseProductStore>((set) => ({
  products: [],
  total: 0,
  isLoading: false,
  isLoadingGenerateRandomProducts: false,
  isLoadingFetchProductsWithFilters: false,
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
        set((state) => ({
          products: [
            newProduct,
            ...(state.total > DEFAULT_PAGINATION.limit
              ? state.products.slice(0, -1)
              : state.products)
          ],
          total: state.total + 1
        }));

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

  updateProduct: async (id: string, product: Partial<IProduct>) => {
    set({ isLoading: true, error: null });
    return productService
      .update(id, product)
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

  deleteProduct: (id: string, filters) => {
    set({ isLoading: true, error: null });
    productService
      .remove(id)
      .then(() => {
        productService
          .findWithFilters(filters)
          .then(({ products, total }) => {
            console.log("total", total);

            set({ products, total });
          })
          .catch((error) => {
            handleHttpError(error, "Ошибка при загрузке товаров с фильтрами");
            set({ error });
          })
          .finally(() => set({ isLoading: false }));
      })
      .catch((error) => {
        handleHttpError(error, "Ошибка при удалении товара");
        set({ error });
      })
      .finally(() => set({ isLoading: false }));
  },

  fetchProductsWithFilters: (filters: IProductFindWithFilters) => {
    set({ isLoadingFetchProductsWithFilters: true, error: null });

    productService
      .findWithFilters(filters)
      .then(({ products, total }) => {
        set({ products, total });
      })
      .catch((error) => {
        handleHttpError(error, "Ошибка при загрузке товаров с фильтрами");
        set({ error });
      })
      .finally(() => set({ isLoadingFetchProductsWithFilters: false }));
  },

  generateRandomProducts: async () => {
    set({ isLoadingGenerateRandomProducts: true, error: null });

    const limit = DEFAULT_PAGINATION.limit;

    productService
      .generateRandomProducts(limit)
      .then((data) => {
        const { count, newTotalQuantity, createdProducts } = data;
        set((state) => ({
          total: newTotalQuantity,
          products:
            newTotalQuantity === count
              ? [...state.products, ...createdProducts]
              : state.products
        }));

        productService
          .findWithFilters(DEFAULT_PAGINATION)
          .then(({ products, total }) => {
            set({ products, total });
          })
          .catch((error) => {
            handleHttpError(error, "Ошибка при загрузке товаров с фильтрами");
            set({ error });
          })
          .finally(() => set({ isLoading: false }));

        notification.success({
          message: "Товары успешно сгенерированы",
          description: `Сгенерировано ${count} шт`
        });
      })
      .catch((error) => {
        handleHttpError(error, "Ошибка при генерации товаров");
        set({ error });
        return null;
      })
      .finally(() => set({ isLoadingGenerateRandomProducts: false }));
  }
}));

export default useProductStore;
