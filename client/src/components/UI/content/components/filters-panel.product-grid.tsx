import { debounce } from "lodash";
import { FC, useCallback, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import useProductStore from "@store/product.store";
import { Flex, Input, Select, Spin, Typography } from "antd";
import { IProductFindWithFilters } from "@interfaces/product.interface";
import { DEFAULT_PAGINATION } from "@config/pagination.config";

interface FiltersPanelProductGridProps {
  pageSize: number;
  order: "asc" | "desc" | undefined;
  searchName: string | undefined;
  totalQuantity: number;
  sort: string;
  isLoading: boolean;
  setOrder: Dispatch<SetStateAction<"asc" | "desc" | undefined>>;
  setSort: Dispatch<SetStateAction<string>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setSearchName: Dispatch<SetStateAction<string | undefined>>;
}

const Component = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const FilterAndSortContainer = styled(Flex)`
  gap: 2px;
`;

const SELECT_OPTIONS = [
  {
    value: "asc",
    label: "Сначала старые товары"
  },
  {
    value: "desc",
    label: "Сначала новые товары"
  }
];

const FiltersPanelProductGrid: FC<FiltersPanelProductGridProps> = ({
  pageSize,
  sort,
  order,
  searchName,
  totalQuantity,
  isLoading,
  setOrder,
  setCurrentPage,
  setSort,
  setSearchName
}): JSX.Element => {
  const { fetchProductsWithFilters, total } = useProductStore();

  const handleSortChange = (value: string | undefined) => {
    const order = value === "none" ? undefined : (value as "asc" | "desc");
    setOrder(order);

    const newPaginationParams: IProductFindWithFilters = {
      page: 1,
      limit: DEFAULT_PAGINATION.limit,
      sort,
      order,
      filters: { name: searchName }
    };

    if (!order) {
      setCurrentPage(1);
      return fetchProductsWithFilters(DEFAULT_PAGINATION);
    }

    setCurrentPage(1);
    fetchProductsWithFilters(newPaginationParams);
  };

  const debouncedSearch = useCallback(
    debounce((name: string) => {
      const newPaginationParams: IProductFindWithFilters = {
        page: 1,
        limit: pageSize,
        sort,
        order,
        filters: { name }
      };

      setCurrentPage(1);
      fetchProductsWithFilters(newPaginationParams);
    }, 300),
    [pageSize, order, fetchProductsWithFilters]
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
        {isLoading ? <Spin /> : `${total} шт`}
      </Typography.Text>

      <FilterAndSortContainer>
        <Input
          placeholder="Искать по названию"
          value={searchName}
          allowClear
          onChange={handleSearchChange}
        />
        <Select
          showSearch
          allowClear
          placeholder="По дате добавления"
          optionFilterProp="label"
          defaultValue=""
          value={order}
          onChange={handleSortChange}
          style={{ width: "300px" }}
          options={SELECT_OPTIONS}
        />
      </FilterAndSortContainer>
    </Component>
  );
};

export default FiltersPanelProductGrid;
