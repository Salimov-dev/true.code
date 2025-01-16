import { FC } from "react";
import { Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import AddProductItemForm from "@forms/add-product-item/add-product-item.form";

interface IProps {
  isModalOpen: boolean;
  cancelModal: () => void;
}

const AddProductItemPage: FC<IProps> = ({ isModalOpen, cancelModal }) => {
  const [form] = useForm();

  return (
    <Modal
      title="Добавить товар"
      open={isModalOpen}
      footer={false}
      width="400px"
      onCancel={cancelModal}
    >
      <AddProductItemForm form={form} onCancel={cancelModal} />
    </Modal>
  );
};

export default AddProductItemPage;
