import { useEffect } from "react";
// dayjs
import dayjs from "dayjs";
import "dayjs/locale/ru";
// antd
import ruRU from "antd/lib/locale/ru_RU";
import { ConfigProvider } from "antd";
// styles
import "../styles/reset.css";
// utils
import setAuthAndUserData from "@utils/auth/set-auth-and-user-data.util";

const AppLoader = ({ children }) => {
  dayjs.locale("ru");
  const accessToken = localStorage.getItem("token");

  useEffect(() => {
    setAuthAndUserData();
  }, [accessToken]);

  return <ConfigProvider locale={ruRU}>{children}</ConfigProvider>;
};

export default AppLoader;
