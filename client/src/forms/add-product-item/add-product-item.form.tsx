import { FC } from "react";
import type { FormInstance } from "antd";
import { Form, Input } from "antd";
import SaveCloseButtons from "@common/buttons/save-cancel-buttons.form";
import { IProduct } from "@interfaces/product.interface";
import InputNumberStyled from "@common/inputs/input-number-styled";
import TextArea from "antd/es/input/TextArea";
import PicturesWall from "@common/upload/pictures-wall";

interface IProps {
  form: FormInstance;
  onFinish: (values: IProduct) => void;
  onCancel: () => void;
}

const AddProductForm: FC<IProps> = ({
  form,
  onFinish,
  onCancel
}): JSX.Element => {
  return (
    <Form
      form={form}
      name="login"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
      style={{ margin: "20px 0 10px 0" }}
    >
      <Form.Item<IProduct>
        label="Название"
        name="name"
        rules={[
          { required: true, message: "Введите название товара!" },
          {
            min: 2,
            max: 25,
            message: "Длина имени должна быть от 2 до 25 символов"
          }
        ]}
      >
        <Input autoComplete="name" placeholder="Введите название" />
      </Form.Item>

      <Form.Item<IProduct>
        label="Артикул"
        name="sku"
        rules={[
          { required: true, message: "Введите артикул товара!" },
          {
            min: 6,
            max: 20,
            message: "Длина артикула должна быть от 6 до 20 символов"
          }
        ]}
      >
        <Input autoComplete="sku" placeholder="Введите артикул" />
      </Form.Item>

      <Form.Item<IProduct>
        label="Стоимость"
        name="price"
        valuePropName="value"
        rules={[
          { required: true, message: "Введите стоимость товара!" },
          {
            type: "number",
            min: 0.01,
            message: "Стоимость должна быть больше 0"
          },
          {
            type: "number",
            max: 1000000,
            message: "Стоимость не должна превышать 1 000 000"
          }
        ]}
      >
        <InputNumberStyled
          autoComplete="price"
          addonAfter="₽"
          placeholder="Введите стоимость товара"
        />
      </Form.Item>

      <Form.Item<IProduct>
        label="Стоимость со скидкой"
        name="discountPrice"
        rules={[
          {
            required: true,
            message: "Введите стоимость товара со скидкой!"
          },
          {
            type: "number",
            min: 0.01,
            message: "Стоимость со скидкой должна быть больше 0"
          },
          {
            type: "number",
            max: 1000000,
            message: "Стоимость со скидкой не должна превышать 1 000 000"
          },
          {
            validator(_, value) {
              const price = form.getFieldValue("price");
              if (value > price) {
                return Promise.reject(
                  new Error(
                    "Стоимость со скидкой не может быть выше начальной стоимости"
                  )
                );
              }

              return Promise.resolve();
            }
          }
        ]}
      >
        <InputNumberStyled
          autoComplete="discountPrice"
          addonAfter="₽"
          placeholder="Введите стоимость товара со скидкой"
        />
      </Form.Item>

      <Form.Item<IProduct>
        label="Описание"
        name="description"
        rules={[
          { required: true, message: "Введите описание товара!" },
          {
            min: 10,
            max: 1000,
            message: "Длина описания должна быть от 10 до 1000 символов"
          }
        ]}
      >
        <TextArea
          rows={4}
          autoComplete="description"
          placeholder="Введите описание"
        />
      </Form.Item>

      <Form.Item<IProduct>
        label="Изображение"
        name="images"
        // rules={[
        //   {
        //     min: 5,
        //     max: 255,
        //     message:
        //       "Длина ссылки на изображение должна быть от 5 до 255 символов"
        //   }
        // ]}
      >
        <PicturesWall form={form} />
      </Form.Item>

      <SaveCloseButtons onClose={onCancel} />
    </Form>
  );
};

export default AddProductForm;
