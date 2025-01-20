import { Button } from "antd";
import { FC, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { PlusOutlined } from "@ant-design/icons";
import CreateProductPage from "@pages/product/create-product/create-product.page";
import uploadService from "@services/upload.service";

const CreateProductButtonHeader: FC = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [temporaryImages, setTemporaryImages] = useState<string[]>([]);
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
        setTemporaryImages={setTemporaryImages}
      />
    </>
  );
};

export default CreateProductButtonHeader;
