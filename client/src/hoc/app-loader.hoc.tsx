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
import useProductStore from "@store/product.store";
import { DEFAULT_PAGINATION } from "@config/pagination.config";

const AppLoader = ({ children }) => {
  dayjs.locale("ru");
  const accessToken = localStorage.getItem("token");

  const { fetchProductsWithFilters } = useProductStore();

  useEffect(() => {
    fetchProductsWithFilters(DEFAULT_PAGINATION);
  }, [fetchProductsWithFilters]);

  useEffect(() => {
    setAuthAndUserData();
  }, [accessToken]);

  return <ConfigProvider locale={ruRU}>{children}</ConfigProvider>;
};

export default AppLoader;
