import AuthPage from "@pages/auth/auth.page";
import { Button } from "antd";
import { FC, useState } from "react";

const AuthButtonHeader: FC = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const cancelModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button color="danger" variant="outlined" onClick={showModal}>
        Вход
      </Button>

      <AuthPage isModalOpen={isModalOpen} cancelModal={cancelModal} />
    </>
  );
};

export default AuthButtonHeader;
