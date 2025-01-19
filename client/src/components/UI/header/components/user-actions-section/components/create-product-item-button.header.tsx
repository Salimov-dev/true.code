import { Button } from "antd";
import { FC, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { PlusOutlined } from "@ant-design/icons";
import CreateProductPage from "@pages/product/create-product.page";

const CreateProductButtonHeader: FC = (): JSX.Element => {
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

      <CreateProductPage
        form={form}
        isModalOpen={isModalOpen}
        onCancel={cancelModal}
      />
    </>
  );
};

export default CreateProductButtonHeader;
