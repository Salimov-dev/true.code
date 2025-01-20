import { FC } from "react";
import { Flex, Modal } from "antd";
import { IProduct } from "@interfaces/product.interface";
import ImageGalleryProductDetails from "./components/image-gallery.product-details";
import ItemDetailsProductDetails from "./components/item-details.product-details";

interface IProps {
  isModalOpen: boolean;
  onCancel: () => void;
  product: IProduct;
}

const ProductDetailsPage: FC<IProps> = ({
  isModalOpen,
  onCancel,
  product
}): JSX.Element => {
  return (
    <Modal
      title="Детали продукта"
      open={isModalOpen}
      onCancel={onCancel}
      footer={null}
      width={1000}
    >
      <Flex vertical style={{ fontSize: "1.3rem" }}>
        <ItemDetailsProductDetails product={product} />
        <ImageGalleryProductDetails product={product} />
      </Flex>
    </Modal>
  );
};

export default ProductDetailsPage;
