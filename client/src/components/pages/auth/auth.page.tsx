import { FC, useState } from "react";
import { Modal, Segmented } from "antd";
import LoginForm from "@forms/login/login.form";
import RegisterForm from "@forms/register/register.form";
import { ILogin, IRegister, Segment } from "@interfaces/auth.interface";
import { FormProps, useForm } from "antd/es/form/Form";
import useAuthStore from "@store/auth.store";

const options = [
  { label: "ВОЙТИ", value: "login" },
  { label: "РЕГИСТРАЦИЯ", value: "register" }
];

interface IProps {
  isModalOpen: boolean;
  onCancel: () => void;
}

const AuthPage: FC<IProps> = ({ isModalOpen, onCancel }) => {
  const [form] = useForm();
  const [segment, setSegment] = useState<Segment>("login");
  const { login, register } = useAuthStore();

  const handleChangeSegment = (value: Segment) => {
    setSegment(value);
  };

  const handleFinishRegister: FormProps<IRegister>["onFinish"] = async (
    registerData
  ) => {
    register(registerData);
    form.resetFields();
    onCancel();
  };

  const handleFinishLogin: FormProps<ILogin>["onFinish"] = (loginData) => {
    login(loginData).then((accessToken) => {
      if (accessToken) {
        onCancel();
        form.resetFields();
      }
    });
  };

  return (
    <Modal
      title="Авторизация"
      open={isModalOpen}
      footer={false}
      width="400px"
      onCancel={onCancel}
    >
      <Segmented
        options={options}
        block
        onChange={(value) => handleChangeSegment(value as Segment)}
      />

      {segment === "login" ? (
        <LoginForm form={form} onFinish={handleFinishLogin} />
      ) : (
        <RegisterForm form={form} onFinish={handleFinishRegister} />
      )}
    </Modal>
  );
};

export default AuthPage;
