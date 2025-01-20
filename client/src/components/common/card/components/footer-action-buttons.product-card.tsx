import { FC } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import IconStyled from "@common/icon/icon-styled";
import { Flex } from "antd";
import { IProduct } from "@interfaces/product.interface";
import useAuthStore from "@store/auth.store";

interface IProps {
  onUpdateProduct: (product: IProduct) => void;
  onDeleteProduct: (productId: string) => void;
  product: IProduct;
}

const FooterActionButtonsProductCard: FC<IProps> = ({
  onUpdateProduct,
  onDeleteProduct,
  product
}): JSX.Element | null => {
  const { isAuth } = useAuthStore();

  return isAuth ? (
    <Flex gap={8}>
      <IconStyled>
        <EditOutlined onClick={() => onUpdateProduct(product)} />
      </IconStyled>
      <IconStyled>
        <DeleteOutlined onClick={() => onDeleteProduct(product.id)} />
      </IconStyled>
    </Flex>
  ) : null;
};

export default FooterActionButtonsProductCard;
