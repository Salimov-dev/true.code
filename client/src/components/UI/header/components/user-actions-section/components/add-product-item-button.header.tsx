import { Button } from "antd";
import { FC, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { PlusOutlined } from "@ant-design/icons";
import AddProductPage from "@pages/add-product/add-product.page";

const AddProductButtonHeader: FC = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const cancelModal = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <>
      <Button
        color="danger"
        variant="outlined"
        onClick={showModal}
        icon={<PlusOutlined />}
      >
        Добавить товар
      </Button>

      <AddProductPage
        form={form}
        isModalOpen={isModalOpen}
        onCancel={cancelModal}
      />
    </>
  );
};

export default AddProductButtonHeader;
