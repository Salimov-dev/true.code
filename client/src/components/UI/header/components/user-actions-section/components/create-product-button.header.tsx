import { Button, notification } from "antd";
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

  const handleCancel = async () => {
    try {
      await Promise.all(
        temporaryImages.map(async (url) => {
          const res = await uploadService.deleteFile(url);
          notification.success({
            message: "Успешное удаление изображения",
            description: `Удалено временное изображение: ${res.fileUrl}`
          });
        })
      );
      setTemporaryImages([]);
    } catch (error) {
      notification.error({
        message: `Ошибка при удалении временных изображений ${error}`
      });
    } finally {
      setIsModalOpen(false);
      form.resetFields();
    }
  };

  const handleSave = () => {
    setIsModalOpen(false);
    form.resetFields();
    setTemporaryImages([]);
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
        onCancel={handleCancel}
        onSave={handleSave}
        setTemporaryImages={setTemporaryImages}
      />
    </>
  );
};

export default CreateProductButtonHeader;
