import { IProductFindWithFilters } from "@interfaces/product.interface";
import { Pagination } from "antd";
import styled from "styled-components";
import config from "@config/config.json";
import useProductStore from "@store/product.store";
import { DEFAULT_PAGINATION } from "@config/pagination.config";

interface PaginationStyledProps {
  searchName: string | undefined;
  current: number;
  total: number;
  pageSize: number;
  sort: string;
  order: "asc" | "desc" | undefined;
  setPageSize: (size: number) => void;
  setCurrentPage: (page: number) => void;
}

const Component = styled(Pagination)`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 50px 0 10px 0;
`;

const PAGE_SIZE_OPTIONS = ["8", "16", "32", "64"];

const PaginationStyled = ({
  searchName,
  current,
  pageSize,
  sort,
  order,
  setPageSize,
  setCurrentPage
}: PaginationStyledProps) => {
  const { fetchProductsWithFilters, total } = useProductStore();
  const handlePageChange = (page: number) => {
    const newPaginationParams: IProductFindWithFilters = {
      page,
      limit: DEFAULT_PAGINATION.limit,
      sort,
      order,
      filters: { name: searchName }
    };

    setCurrentPage(page);
    fetchProductsWithFilters(newPaginationParams);
  };

  const handlePageSizeChange = (current: number, size: number) => {
    const newPaginationParams: IProductFindWithFilters = {
      page: current,
      limit: size,
      sort,
      order,
      filters: { name: searchName }
    };

    setPageSize(size);
    fetchProductsWithFilters(newPaginationParams);
  };

  return total ? (
    <Component
      defaultCurrent={1}
      current={current}
      total={total}
      pageSize={pageSize}
      onChange={handlePageChange}
      showSizeChanger={true}
      onShowSizeChange={handlePageSizeChange}
      pageSizeOptions={PAGE_SIZE_OPTIONS}
    />
  ) : null;
};

export default PaginationStyled;
