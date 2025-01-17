import { FC } from "react";
import { message, Modal, notification } from "antd";
import { FormInstance, FormProps } from "antd/es/form/Form";
import { IProduct } from "@interfaces/product.interface";
import useProductStore from "@store/product.store";
import AddProductForm from "@forms/add-product-item/add-product-item.form";

interface IProps {
  form: FormInstance;
  isModalOpen: boolean;
  onCancel: () => void;
}

const AddProductPage: FC<IProps> = ({ form, isModalOpen, onCancel }) => {
  const { createProduct } = useProductStore();

  const handleFinish: FormProps<IProduct>["onFinish"] = (newProduct) => {
    console.log("newProduct", newProduct);
    createProduct(newProduct);

    // TODO разблокировать
    // form.resetFields();
  };

  return (
    <Modal
      title="Добавить"
      open={isModalOpen}
      footer={false}
      width="500px"
      onCancel={onCancel}
    >
      <AddProductForm form={form} onFinish={handleFinish} onCancel={onCancel} />
    </Modal>
  );
};

export default AddProductPage;
