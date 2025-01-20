import { FC, useEffect, useState } from "react";
import { Layout } from "antd";
import styled from "styled-components";
import ProductGrid from "./components/product-grid";
import PaginationStyled from "@common/pagination/pagination-styled";
import FiltersPanelProductGrid from "./components/filters-panel.product-grid";
import useProductStore from "@store/product.store";
import { DEFAULT_PAGINATION } from "@config/pagination.config";

const Component = styled(Layout.Content)`
  text-align: center;
  min-height: 120px;
  line-height: 120px;
  color: #fff;
  background-color: Aqua;
  padding: 20px;
`;

const Content: FC = (): JSX.Element => {
  const {
    products,
    total,
    isLoadingFetchProductsWithFilters,
    isLoadingGenerateRandomProducts
  } = useProductStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalQuantity, setTotalQuantity] = useState(null);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGINATION.limit);
  const [sort, setSort] = useState(DEFAULT_PAGINATION.sort);
  const [order, setOrder] = useState<"asc" | "desc" | undefined>(null);
  const [searchName, setSearchName] = useState<string | undefined>();

  useEffect(() => {
    if (total && products) setTotalQuantity(total);
  }, [total, products]);

  return (
    <Component>
      <FiltersPanelProductGrid
        totalQuantity={totalQuantity}
        isLoading={isLoadingGenerateRandomProducts}
        pageSize={pageSize}
        order={order}
        sort={sort}
        setSort={setSort}
        searchName={searchName}
        setOrder={setOrder}
        setCurrentPage={setCurrentPage}
        setSearchName={setSearchName}
      />

      <ProductGrid
        products={products}
        currentPage={currentPage}
        totalQuantity={total}
        isLoading={isLoadingFetchProductsWithFilters}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
        sort={sort}
        order={order}
        searchName={searchName}
      />

      <PaginationStyled
        searchName={searchName}
        current={currentPage}
        total={total}
        pageSize={pageSize}
        sort={sort}
        order={order}
        setPageSize={setPageSize}
        setCurrentPage={setCurrentPage}
      />
    </Component>
  );
};

export default Content;
