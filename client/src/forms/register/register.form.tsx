import { FC } from "react";
import { Form, FormInstance, Input } from "antd";
import { regexPatterns } from "@utils/regex/regex.utils";
import { IRegister } from "@interfaces/auth.interface";
import SubmitButtonForm from "@common/buttons/submit-button.form";

interface IProps {
  form: FormInstance;
  onFinish: (values: IRegister) => void;
}

const RegisterForm: FC<IProps> = ({ form, onFinish }): JSX.Element => {
  return (
    <Form
      form={form}
      name="register"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
      style={{ margin: "20px 0 10px 0" }}
    >
      <Form.Item<IRegister>
        label="Имя"
        name="firstName"
        rules={[
          { required: true, message: "Введите своё имя!" },
          {
            min: 3,
            max: 20,
            message: "Имя должно быть длинной от 2 до 20 символов"
          }
        ]}
      >
        <Input autoComplete="firstName" placeholder="Введите имя" />
      </Form.Item>

      <Form.Item<IRegister>
        label="Фамилия"
        name="lastName"
        rules={[
          { required: true, message: "Введите свою фамилию!" },
          {
            min: 3,
            max: 20,
            message: "Фамилия должна быть длинной от 2 до 20 символов"
          }
        ]}
      >
        <Input autoComplete="lastName" placeholder="Введите фамилию" />
      </Form.Item>

      <Form.Item<IRegister>
        label="Почта"
        name="email"
        rules={[
          { required: true, message: "Введите свою почту!" },
          {
            pattern: regexPatterns.EMAIL,
            message: "Введите почту корректно!"
          }
        ]}
      >
        <Input autoComplete="email" placeholder="Введите почту" />
      </Form.Item>

      <Form.Item<IRegister>
        label="Телефон"
        name="phone"
        rules={[
          { required: true, message: "Введите свой телефон!" },
          {
            min: 3,
            max: 20,
            message: "Телефон должен быть длинной от 6 до 20 символов"
          }
        ]}
      >
        <Input autoComplete="phone" placeholder="Введите телефон" />
      </Form.Item>

      <Form.Item<IRegister>
        label="Имя пользователя"
        name="userName"
        rules={[
          { required: true, message: "Введите имя пользователя!" },
          {
            min: 3,
            max: 20,
            message: "Имя пользователя должно быть длинной от 3 до 20 символов"
          }
        ]}
      >
        <Input autoComplete="userName" placeholder="Введите имя пользователя" />
      </Form.Item>

      <Form.Item<IRegister>
        label="Пароль"
        name="password"
        rules={[
          { required: true, message: "Введите пароль!" },
          {
            min: 8,
            message: "Пароль должен содержать минимум 8 символов!"
          },
          {
            pattern: regexPatterns.PASSWORD,
            message:
              "Пароль должен содержать цифры, заглавные и строчные буквы, а также специальные символы"
          }
        ]}
      >
        <Input.Password
          autoComplete="new-password"
          placeholder="Введите пароль"
        />
      </Form.Item>

      <Form.Item<IRegister>
        label="Повторите пароль"
        name="repeatPassword"
        rules={[
          { required: true, message: "Повторите введенный пароль!" },
          {
            min: 8,
            message: "Пароль должен содержать минимум 8 символов!"
          },
          {
            pattern: regexPatterns.PASSWORD,
            message:
              "Повторный пароль должен содержать цифры, заглавные и строчные буквы, а также специальные символы"
          },
          {
            validator(_, value) {
              const password = form.getFieldValue("password");

              if (!value || password !== value) {
                return Promise.reject(
                  new Error("Введенные пароли не совпадают!")
                );
              }

              return Promise.resolve();
            }
          }
        ]}
      >
        <Input.Password
          autoComplete="confirm-password"
          placeholder="Повторите введенный пароль"
        />
      </Form.Item>

      <SubmitButtonForm />
    </Form>
  );
};

export default RegisterForm;
