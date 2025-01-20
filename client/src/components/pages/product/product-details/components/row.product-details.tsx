import { Flex, Typography } from "antd";
import { FC } from "react";
import styled from "styled-components";

interface IProps {
  label: string;
  value: string | number;
}

const RowContainer = styled(Flex)`
  gap: 4px;
`;

const RenderProductDetail: FC<IProps> = ({ label, value }): JSX.Element => (
  <RowContainer>
    <Typography.Text style={{ fontWeight: "bold" }}>{label}:</Typography.Text>
    <Typography.Text>{value}</Typography.Text>
  </RowContainer>
);

export default RenderProductDetail;
