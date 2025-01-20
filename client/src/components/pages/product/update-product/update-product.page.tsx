import { FC } from "react";
import { Modal } from "antd";
import { FormInstance, FormProps } from "antd/es/form/Form";
import { IProduct } from "@interfaces/product.interface";
import useProductStore from "@store/product.store";
import ProductForm from "@forms/product/product.form";

interface IProps {
  form: FormInstance;
  isModalOpen: boolean;
  onCancel: () => void;
  initialValues: IProduct;
  setSelectedProduct: (value: IProduct) => void;
  setTemporaryImages: (value: string[]) => void;
  setIsModalOpen: (value: boolean) => void;
}

const UpdateProductPage: FC<IProps> = ({
  form,
  isModalOpen,
  onCancel,
  setIsModalOpen,
  setSelectedProduct,
  setTemporaryImages,
  initialValues
}): JSX.Element => {
  const { updateProduct } = useProductStore();

  const handleFinish: FormProps<IProduct>["onFinish"] = (updatedProduct) => {
    if (!initialValues) {
      return;
    }

    const formattedProduct = {
      ...updatedProduct,
      userId: initialValues.userId
    };

    updateProduct(initialValues.id, formattedProduct);

    setSelectedProduct(updatedProduct);
    setIsModalOpen(false);
    setTemporaryImages([]);

    form.resetFields();
  };

  return (
    <Modal
      title="Редактировать товар"
      open={isModalOpen}
      footer={false}
      width="500px"
      onCancel={onCancel}
      maskClosable={false}
    >
      <ProductForm
        form={form}
        onFinish={handleFinish}
        onCancel={onCancel}
        initialValues={initialValues}
        setTemporaryImages={setTemporaryImages}
      />
    </Modal>
  );
};

export default UpdateProductPage;
