import { FC } from "react";
import type { FormInstance, FormProps } from "antd";
import { Form, Input } from "antd";
import SaveCloseButtons from "@common/buttons/save-cancel-buttons.form";
import { IProduct } from "@interfaces/product.interface";

interface IProps {
  form: FormInstance;
  onCancel: () => void;
}

const AddProductItemForm: FC<IProps> = ({ form, onCancel }): JSX.Element => {
  const handleFinish: FormProps<IProduct>["onFinish"] = (newItemData) => {
    console.log("newItemData", newItemData);
  };

  return (
    <Form
      form={form}
      name="login"
      initialValues={{ remember: true }}
      onFinish={handleFinish}
      autoComplete="off"
      style={{ margin: "20px 0 10px 0" }}
    >
      <Form.Item<IProduct>
        label="Название"
        name="name"
        rules={[{ required: true, message: "Введите название товара!" }]}
      >
        <Input autoComplete="name" />
      </Form.Item>

      <Form.Item<IProduct>
        label="Описание"
        name="description"
        rules={[{ required: true, message: "Введите описание товара!" }]}
      >
        <Input autoComplete="description" />
      </Form.Item>

      <Form.Item<IProduct>
        label="Стоимость"
        name="price"
        rules={[{ required: true, message: "Введите стоимость товара!" }]}
      >
        <Input autoComplete="price" />
      </Form.Item>

      <Form.Item<IProduct>
        label="Стоимость со скидкой"
        name="discountPrice"
        rules={[
          {
            required: true,
            message: "Введите стоимость товара со скидкой товара!"
          }
        ]}
      >
        <Input autoComplete="discountPrice" />
      </Form.Item>

      <Form.Item<IProduct>
        label="Артикул"
        name="sku"
        rules={[{ required: true, message: "Введите артикул товара!" }]}
      >
        <Input autoComplete="sku" />
      </Form.Item>

      <SaveCloseButtons onClose={onCancel} />
    </Form>
  );
};

export default AddProductItemForm;
