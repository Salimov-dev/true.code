import { IProduct } from "@interfaces/product.interface";
import { Flex, Typography } from "antd";
import { FC } from "react";

interface IProps {
  product: IProduct;
}

const HeaderProductCard: FC<IProps> = ({ product }): JSX.Element => {
  return (
    <Flex vertical>
      <Typography.Title level={4}>{product.name}</Typography.Title>
      <Typography.Paragraph ellipsis={{ rows: 3, expandable: false }}>
        {product.description}
      </Typography.Paragraph>
    </Flex>
  );
};

export default HeaderProductCard;
