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
  setTemporaryImages: (value: string[]) => void;
}

const CreateProductPage: FC<IProps> = ({
  form,
  isModalOpen,
  onCancel,
  setTemporaryImages
}): JSX.Element => {
  const { createProduct } = useProductStore();

  const handleFinish: FormProps<IProduct>["onFinish"] = (newProduct) => {
    createProduct(newProduct);
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title="Добавить товар"
      open={isModalOpen}
      footer={false}
      width="500px"
      onCancel={onCancel}
    >
      <ProductForm
        form={form}
        onFinish={handleFinish}
        onCancel={onCancel}
        setTemporaryImages={setTemporaryImages}
      />
    </Modal>
  );
};

export default CreateProductPage;
