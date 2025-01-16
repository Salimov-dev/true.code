import { FC } from "react";
import type { FormInstance, FormProps } from "antd";
import { Form, Input } from "antd";
import { ILogin } from "@interfaces/auth.interface";
import SubmitButtonForm from "@common/buttons/submit-button.form";
import useAuthStore from "@store/auth.store";

interface IProps {
  form: FormInstance;
  onCancel: () => void;
}

const LoginForm: FC<IProps> = ({ form, onCancel }): JSX.Element => {
  const { login } = useAuthStore();

  const handleFinish: FormProps<ILogin>["onFinish"] = (loginData) => {
    login(loginData).then((accessToken) => {
      if (accessToken) {
        onCancel();
        form.resetFields();
      }
    });
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
      <Form.Item<ILogin>
        label="Имя пользователя"
        name="userName"
        rules={[{ required: true, message: "Введите имя пользователя!" }]}
      >
        <Input autoComplete="userName" />
      </Form.Item>

      <Form.Item<ILogin>
        label="Пароль"
        name="password"
        rules={[{ required: true, message: "Введите пароль!" }]}
      >
        <Input.Password autoComplete="current-password" />
      </Form.Item>

      <SubmitButtonForm submitText="Войти" />
    </Form>
  );
};

export default LoginForm;
