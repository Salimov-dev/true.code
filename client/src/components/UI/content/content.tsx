import { debounce } from "lodash";
import { useEffect, useState, useCallback } from "react";
import useProductStore from "@store/product.store";
import { Flex, Input, Layout, Select, Spin, Typography } from "antd";
import styled from "styled-components";
import ProductGrid from "./components/product-grid";
import PaginationStyled from "@common/pagination/pagination-styled";
import { IProductFindWithFilters } from "@interfaces/product.interface";
import config from "@config/config.json";
import FiltersPanelProductGrid from "./components/filters-panel.product-grid";

const Component = styled(Layout.Content)`
  text-align: center;
  min-height: 120px;
  line-height: 120px;
  color: #fff;
  background-color: Aqua;
  padding: 20px;
`;

const DEFAULT_PAGINATION: IProductFindWithFilters = {
  ...config.defaultPagination,
  order: config.defaultPagination.order as "desc" | "asc"
};

const Content = () => {
  const {
    fetchProductsWithFilters,
    products,
    total,
    isLoadingFetchProductsWithFilters,
    isLoadingGenerateRandomProducts
  } = useProductStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalQuantity, setTotalQuantity] = useState(total);
  const [pageSize, setPageSize] = useState(config.defaultPagination.limit);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | undefined>();
  const [searchName, setSearchName] = useState<string | undefined>();

  const handlePageChange = (page: number) => {
    const newPaginationParams: IProductFindWithFilters = {
      page,
      limit: config.defaultPagination.limit,
      sort: sortOrder ? "name" : undefined,
      order: sortOrder,
      filters: { name: searchName }
    };

    setCurrentPage(page);
    fetchProductsWithFilters(newPaginationParams);
  };

  const handlePageSizeChange = (current: number, size: number) => {
    const newPaginationParams: IProductFindWithFilters = {
      page: current,
      limit: size,
      sort: sortOrder ? "name" : undefined,
      order: sortOrder,
      filters: { name: searchName }
    };

    setPageSize(size);
    fetchProductsWithFilters(newPaginationParams);
  };

  useEffect(() => {
    fetchProductsWithFilters(DEFAULT_PAGINATION);
  }, [fetchProductsWithFilters]);

  useEffect(() => {
    if (total && products) setTotalQuantity(total);
  }, [total, products]);

  return (
    <Component>
      <FiltersPanelProductGrid
        totalQuantity={totalQuantity}
        isLoading={isLoadingGenerateRandomProducts}
      />

      <ProductGrid
        products={products}
        totalQuantity={total}
        isLoading={isLoadingFetchProductsWithFilters}
      />

      <PaginationStyled
        current={currentPage}
        total={totalQuantity}
        onPageChange={handlePageChange}
        pageSize={pageSize}
        onPageSizeChange={handlePageSizeChange}
      />
    </Component>
  );
};

export default Content;
