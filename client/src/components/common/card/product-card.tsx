import { Card, Flex } from "antd";
import { FC } from "react";
import styled from "styled-components";
import { IProduct } from "@interfaces/product.interface";
import CoverProductCard from "./components/cover.product-card";
import HeaderProductCard from "./components/header.product-card";
import ContentProductCard from "./components/content.product-card ";
import FooterProductCard from "./components/footer.product-card";

interface IProps {
  product: IProduct;
}

const ProductDetails = styled(Flex)`
  height: 280px;
  justify-content: space-between;
  align-items: space-between;
`;

const CardComponent = styled(Card)`
  height: 100%;
  width: 100%;
`;

const ProductCard: FC<IProps> = ({ product }) => {
  return (
    <CardComponent hoverable cover={<CoverProductCard product={product} />}>
      <ProductDetails vertical>
        <HeaderProductCard product={product} />

        <Flex vertical>
          <ContentProductCard product={product} />
          <FooterProductCard product={product} />
        </Flex>
      </ProductDetails>
    </CardComponent>
  );
};

export default ProductCard;
