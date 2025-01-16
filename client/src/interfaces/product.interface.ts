export interface IProduct {
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  sku: string;
  image?: string | null;
}

export interface IProductImageUpload {
  productId: string;
  image: File | null;
}

export interface IProductImageDelete {
  productId: string;
}
