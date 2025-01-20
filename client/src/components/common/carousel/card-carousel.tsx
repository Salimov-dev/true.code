import { IProduct } from "@interfaces/product.interface";
import { Carousel } from "antd";
import config from "@config/config.json";
import { FC } from "react";

interface IProps {
  product: IProduct;
}

const CardCarousel: FC<IProps> = ({ product }): JSX.Element => {
  return (
    <Carousel
      effect="fade"
      style={{
        height: "240px",
        overflow: "hidden",
        background: "black",
        borderRadius: "8px 8px 0 0"
      }}
    >
      {product.images.map((imagePath: string, index: number) => {
        const baseUrl = config.baseURL;
        const path = `${baseUrl}${imagePath}`;

        return (
          <img
            key={index}
            src={path}
            alt={`${product.name} image ${index + 1}`}
          />
        );
      })}
    </Carousel>
  );
};

export default CardCarousel;
