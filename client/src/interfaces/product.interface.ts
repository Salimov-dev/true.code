export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  sku: string;
  images?: string[] | [] | null;
  // images?: UploadFile[] | null;
  userId: string;
}

export interface IProductImageUpload {
  productId: string;
  image: File | null;
}

export interface IProductImageDelete {
  productId: string;
}
