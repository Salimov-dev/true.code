import { Flex, Spin } from "antd";
import styled from "styled-components";
import { IProduct } from "@interfaces/product.interface";
import EmptyProductsPage from "@pages/product/empty-product/empty-product.page";
import ProductGridItems from "./items.product-grid";

interface ProductGridProps {
  products: IProduct[];
  totalQuantity: number;
  currentPage: number;
  isLoading: boolean;
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
  pageSize: number;
  sort: string;
  searchName: string;
  order: "asc" | "desc" | undefined;
}

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
  isLoading,
  setCurrentPage,
  pageSize,
  sort,
  searchName,
  currentPage,
  order
}: ProductGridProps) => {
  return !isLoading ? (
    totalQuantity ? (
      <ProductGridItems
        products={products}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
        sort={sort}
        currentPage={currentPage}
        order={order}
        searchName={searchName}
      />
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
