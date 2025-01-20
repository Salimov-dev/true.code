import styled from "styled-components";
import { useForm } from "antd/es/form/Form";
import { Flex, Modal, Typography } from "antd";
import { FC, useEffect, useState } from "react";
import { IProduct } from "@interfaces/product.interface";
import UpdateProductPage from "@pages/product/update-product/update-product.page";
import uploadService from "@services/upload.service";
import useProductStore from "@store/product.store";
import FooterActionButtonsProductCard from "./footer-action-buttons.product-card";

interface IProps {
  product: IProduct;
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
  pageSize: number;
  sort: string;
  searchName: string;
  order: "asc" | "desc" | undefined;
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

const FooterProductCard: FC<IProps> = ({
  product,
  setCurrentPage,
  pageSize,
  sort,
  order,
  searchName
}): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [temporaryImages, setTemporaryImages] = useState<string[]>([]);

  const { deleteProduct, fetchProductsWithFilters, products } =
    useProductStore();

  const [form] = useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const cancelModal = async () => {
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

  const handleDeleteProduct = (productId: string) => {
    Modal.confirm({
      title: "Вы уверены, что хотите удалить этот продукт?",
      content: "Это действие невозможно отменить.",
      okText: "Удалить",
      cancelText: "Отмена",
      onOk: async () => {
        deleteProduct(productId);

        setCurrentPage((prev: number) => {
          const newPage = products.length === 1 && prev > 1 ? prev - 1 : prev;
          fetchProductsWithFilters({
            page: newPage,
            limit: pageSize,
            sort,
            order,
            filters: { name: searchName }
          });
          return newPage;
        });
      },
      onCancel() {
        console.log("Удаление отменено");
      }
    });
  };

  useEffect(() => {
    setSelectedProduct(product);
  }, [product]);

  return (
    <Component>
      <FooterActionButtonsProductCard
        product={product}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
      />
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
