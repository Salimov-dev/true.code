import { FC, useState } from "react";
import { Modal, Segmented } from "antd";
import LoginForm from "@forms/login/login.form";
import RegisterForm from "@forms/register/register.form";
import { Segment } from "@interfaces/auth.interface";
import { useForm } from "antd/es/form/Form";

const options = [
  { label: "ВОЙТИ", value: "login" },
  { label: "РЕГИСТРАЦИЯ", value: "register" }
];

interface IProps {
  isModalOpen: boolean;
  cancelModal: () => void;
}

const AuthPage: FC<IProps> = ({ isModalOpen, cancelModal }) => {
  const [form] = useForm();
  const [segment, setSegment] = useState<Segment>("login");

  const handleChangeSegment = (value: Segment) => {
    setSegment(value);
  };

  return (
    <Modal
      title="Авторизация"
      open={isModalOpen}
      footer={false}
      width="400px"
      onCancel={cancelModal}
    >
      <Segmented
        options={options}
        block
        onChange={(value) => handleChangeSegment(value as Segment)}
      />

      {segment === "login" ? (
        <LoginForm form={form} onCancel={cancelModal} />
      ) : (
        <RegisterForm form={form} onCancel={cancelModal} />
      )}
    </Modal>
  );
};

export default AuthPage;
