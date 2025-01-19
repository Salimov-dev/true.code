import { IProduct } from "@interfaces/product.interface";
import formatIntegerWithSpaces from "@utils/input/format-integer-with-spaces";
import { Divider, Flex, Typography } from "antd";
import { FC } from "react";
import styled from "styled-components";

interface IProps {
  product: IProduct;
}

const Price = styled(Typography.Text)`
  font-weight: bold;
`;

const DiscountTitle = styled(Typography.Text)`
  font-size: 1.1rem;
  font-weight: bold;
  color: red;
  margin-bottom: -8px;
`;

const DiscountPrice = styled(Typography.Text)`
  font-size: 1.8rem;
  font-weight: bold;
  color: red;
`;

const ContentProductCard: FC<IProps> = ({ product }): JSX.Element => {
  return (
    <>
      <Divider style={{ margin: "10px 0" }} />
      <Flex vertical>
        <Price>Цена: {formatIntegerWithSpaces(product.price)}₽</Price>
        <DiscountTitle>Цена со скидкой</DiscountTitle>
        <DiscountPrice>
          {formatIntegerWithSpaces(product.discountPrice)}₽
        </DiscountPrice>
      </Flex>
      <Divider style={{ margin: "10px 0" }} />
    </>
  );
};

export default ContentProductCard;
