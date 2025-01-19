import { debounce } from "lodash";
import { useEffect, useState, useCallback } from "react";
import useProductStore from "@store/product.store";
import { Flex, Input, Layout, Select, Spin, Typography } from "antd";
import styled from "styled-components";
import ProductGrid from "./components/product-grid";
import PaginationStyled from "@common/pagination/pagination-styled";
import { IProductFindWithFilters } from "@interfaces/product.interface";
import config from "@config/config.json";

const Component = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const FilterAndSortContainer = styled(Flex)`
  gap: 2px;
`;

const FiltersPanelProductGrid = ({
  pageSize,
  sortOrder,
  searchName,
  totalQuantity,
  isLoading,
  setSortOrder,
  setCurrentPage,
  setSearchName
}) => {
  const { fetchProductsWithFilters } = useProductStore();

  const handleSortChange = (value: string | undefined) => {
    const order = value === "none" ? undefined : (value as "asc" | "desc");
    setSortOrder(order);

    const newPaginationParams: IProductFindWithFilters = {
      page: 1,
      limit: config.defaultPagination.limit,
      sort: order ? "name" : undefined,
      order,
      filters: { name: searchName }
    };

    setCurrentPage(1);
    fetchProductsWithFilters(newPaginationParams);
  };

  const debouncedSearch = useCallback(
    debounce((name: string) => {
      const newPaginationParams: IProductFindWithFilters = {
        page: 1,
        limit: pageSize,
        sort: sortOrder ? "name" : undefined,
        order: sortOrder,
        filters: { name }
      };

      setCurrentPage(1);
      fetchProductsWithFilters(newPaginationParams);
    }, 300),
    [pageSize, sortOrder, fetchProductsWithFilters]
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setSearchName(name);
    debouncedSearch(name);
  };
  return (
    <Component>
      <Typography.Text>
        Всего товаров: {""}
        {isLoading || !totalQuantity ? <Spin /> : `${totalQuantity} шт`}
      </Typography.Text>

      <FilterAndSortContainer>
        <Input
          placeholder="Искать по названию"
          value={searchName}
          onChange={handleSearchChange}
        />
        <Select
          showSearch
          allowClear
          placeholder="Выберите сортировку"
          optionFilterProp="label"
          onChange={handleSortChange}
          value={sortOrder}
          style={{ width: "300px" }}
          options={[
            {
              value: "asc",
              label: "По алфавиту"
            },
            {
              value: "desc",
              label: "Против алфавита"
            }
          ]}
        />
      </FilterAndSortContainer>
    </Component>
  );
};

export default FiltersPanelProductGrid;
