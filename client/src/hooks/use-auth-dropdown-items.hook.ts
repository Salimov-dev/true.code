import useAuthStore from "@store/auth.store";
import { MenuProps, Modal } from "antd";

const useAuthDropdownItems = (): MenuProps["items"] => {
  const { logout } = useAuthStore();

  return [
    {
      key: "1",
      label: "Мой профиль"
    },
    {
      key: "2",
      label: "Заказы"
    },
    {
      type: "divider"
    },
    {
      key: "3",
      label: "Выйти",
      onClick: () => {
        Modal.confirm({
          title: "Выйти из системы?",
          okText: "Выйти",
          okType: "danger",
          cancelText: "Остаться",
          onOk: () => {
            logout();
          }
        });
      }
    }
  ];
};

export default useAuthDropdownItems;
