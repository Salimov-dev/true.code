import { FC } from "react";
import { IProduct } from "@interfaces/product.interface";
import formatIntegerWithSpaces from "@utils/input/format-integer-with-spaces";
import RenderProductDetail from "./row.product-details";

interface IProps {
  product: IProduct;
}

const ItemDetailsProductDetails: FC<IProps> = ({ product }): JSX.Element => {
  return (
    <>
      <RenderProductDetail label="Название" value={product.name} />
      <RenderProductDetail
        label="Цена"
        value={`${formatIntegerWithSpaces(product.price)}₽`}
      />
      <RenderProductDetail
        label="Цена со скидкой"
        value={`${formatIntegerWithSpaces(product.discountPrice)}₽`}
      />
      <RenderProductDetail label="Артикул" value={product.sku} />
      <RenderProductDetail label="Описание" value={product.description} />
    </>
  );
};

export default ItemDetailsProductDetails;
