import { Row, Col } from "antd";
import styled from "styled-components";
import ProductCard from "@common/card/product-card";
import { IProduct } from "@interfaces/product.interface";

interface ProductGridItemsProps {
  products: IProduct[];
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
  pageSize: number;
  currentPage: number;
  sort: string;
  searchName: string;
  order: "asc" | "desc" | undefined;
}

const ColWrapper = styled(Col)`
  display: flex;
  justify-content: center;
`;

const ProductGridItems = ({
  products,
  setCurrentPage,
  pageSize,
  currentPage,
  sort,
  order,
  searchName
}: ProductGridItemsProps) => {
  return (
    <Row gutter={[16, 24]} justify="center">
      {products?.map((product) => (
        <ColWrapper key={product.id} xs={24} sm={12} md={12} lg={8} xl={6}>
          <ProductCard
            product={product}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageSize={pageSize}
            sort={sort}
            order={order}
            searchName={searchName}
          />
        </ColWrapper>
      ))}
    </Row>
  );
};

export default ProductGridItems;
