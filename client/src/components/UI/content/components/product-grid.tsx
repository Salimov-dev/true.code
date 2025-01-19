import { Row, Col, Flex, Spin } from "antd";
import styled from "styled-components";
import ProductCard from "@common/card/product-card";
import { IProduct } from "@interfaces/product.interface";
import EmptyProductsPage from "@pages/product/empty-product.page";

interface ProductGridProps {
  products: IProduct[];
  totalQuantity: number;
  isLoading: boolean;
}

const ColWrapper = styled(Col)`
  display: flex;
  justify-content: center;
`;

const Loader = styled(Flex)`
  width: 100%;
  height: 60vh;
  justify-content: center;
  align-items: center;
  color: black;
`;

const ProductGrid = ({
  products,
  totalQuantity,
  isLoading
}: ProductGridProps) => {
  return !isLoading ? (
    totalQuantity ? (
      <Row gutter={[16, 24]} justify="center">
        {products?.map((product) => {
          return (
            <ColWrapper key={product.id} xs={24} sm={12} md={12} lg={8} xl={6}>
              <ProductCard product={product} />
            </ColWrapper>
          );
        })}
      </Row>
    ) : (
      <EmptyProductsPage />
    )
  ) : (
    <Loader>
      <Spin style={{ transform: "scale(2)" }} />
    </Loader>
  );
};

export default ProductGrid;
