import { Button } from "antd";
import { FC, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import AddProductItemPage from "@pages/add-product-item/add-product-item.page";

const AddProductButtonHeader: FC = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const cancelModal = () => {
    setIsModalOpen(false);
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

      <AddProductItemPage isModalOpen={isModalOpen} cancelModal={cancelModal} />
    </>
  );
};

export default AddProductButtonHeader;
