import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import IconStyled from "@common/icon/icon-styled";
import { IProduct } from "@interfaces/product.interface";
import UpdateProductPage from "@pages/product/update-product.page";
import uploadService from "@services/upload.service";
import { Flex, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";

interface IProps {
  product: IProduct;
}

const Component = styled(Flex)`
  height: 100%;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const SKU = styled(Typography.Text)`
  width: 100%;
  text-align: end;
  font-style: italic;
`;

const FooterProductCard: FC<IProps> = ({ product }): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [temporaryImages, setTemporaryImages] = useState<string[]>([]);

  const [form] = useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const cancelModal = async () => {
    // setIsModalOpen(false);
    // form.resetFields();
    try {
      await Promise.all(
        temporaryImages.map(async (url) => {
          const res = await uploadService.deleteFile(url);
          console.log(`Удалено временное изображение: ${res.fileUrl}`);
        })
      );
      setIsModalOpen(false);
      form.resetFields();
      setTemporaryImages([]);
    } catch (error) {
      console.error("Ошибка при удалении временных изображений:", error);
    }
  };

  const handleUpdateProduct = (product: IProduct) => {
    setSelectedProduct(product);
    showModal();
  };

  useEffect(() => {
    setSelectedProduct(product);
  }, [product]);

  return (
    <Component>
      <Flex gap={8}>
        <IconStyled>
          <EditOutlined onClick={() => handleUpdateProduct(product)} />
        </IconStyled>
        <IconStyled>
          <DeleteOutlined />
        </IconStyled>
      </Flex>
      <SKU>Артикул: {product.sku}</SKU>

      <UpdateProductPage
        form={form}
        isModalOpen={isModalOpen}
        onCancel={cancelModal}
        initialValues={selectedProduct}
        setIsModalOpen={setIsModalOpen}
        setSelectedProduct={setSelectedProduct}
        setTemporaryImages={setTemporaryImages}
      />
    </Component>
  );
};

export default FooterProductCard;
