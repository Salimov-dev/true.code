import { EyeInvisibleOutlined } from "@ant-design/icons";
import CardCarousel from "@common/carousel/card-carousel";
import { IProduct } from "@interfaces/product.interface";
import { Typography } from "antd";
import { FC } from "react";
import styled from "styled-components";

interface IProps {
  product: IProduct;
}

const EmptyImageContainer = styled.div`
  height: 240px;
  display: flex;
  color: white;
  overflow: hidden;
  padding-top: 15%;
  background: black;
  align-items: center;
  justify-content: center;
  border-radius: 8px 8px 0 0;
  font-size: 3rem;
`;

const CoverProductCard: FC<IProps> = ({ product }): JSX.Element => {
  const hasImages = !!product?.images?.length;

  return hasImages ? (
    <CardCarousel product={product} />
  ) : (
    <EmptyImageContainer>
      <EyeInvisibleOutlined />
      <Typography.Title style={{ color: "white" }} level={5}>
        Изображения еще загружены
      </Typography.Title>
    </EmptyImageContainer>
  );
};

export default CoverProductCard;
