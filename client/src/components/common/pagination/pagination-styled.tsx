import { Pagination } from "antd";
import styled from "styled-components";

const Component = styled(Pagination)`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 50px 0 10px 0;
`;

interface PaginationStyledProps {
  current: number;
  total: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange: (current: number, size: number) => void;
}

const PaginationStyled = ({
  current,
  total,
  onPageChange,
  pageSize,
  onPageSizeChange
}: PaginationStyledProps) => {
  return total ? (
    <Component
      defaultCurrent={1}
      current={current}
      total={total}
      pageSize={pageSize}
      onChange={onPageChange}
      showSizeChanger={true}
      onShowSizeChange={onPageSizeChange}
    />
  ) : null;
};

export default PaginationStyled;
