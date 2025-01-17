import { FC } from "react";
import type { FormInstance } from "antd";
import { Form, Input } from "antd";
import { ILogin } from "@interfaces/auth.interface";
import SubmitButtonForm from "@common/buttons/submit-button.form";

interface IProps {
  form: FormInstance;
  onFinish: (values: ILogin) => void;
}

const LoginForm: FC<IProps> = ({ form, onFinish }): JSX.Element => {
  return (
    <Form
      form={form}
      name="login"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
      style={{ margin: "20px 0 10px 0" }}
    >
      <Form.Item<ILogin>
        label="Имя пользователя"
        name="userName"
        rules={[{ required: true, message: "Введите имя пользователя!" }]}
      >
        <Input autoComplete="userName" placeholder="Введите имя пользователя" />
      </Form.Item>

      <Form.Item<ILogin>
        label="Пароль"
        name="password"
        rules={[{ required: true, message: "Введите пароль!" }]}
      >
        <Input.Password
          autoComplete="current-password"
          placeholder="Введите пароль"
        />
      </Form.Item>

      <SubmitButtonForm submitText="Войти" />
    </Form>
  );
};

export default LoginForm;
