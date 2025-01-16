import setAuthAndUserData from "@utils/auth/set-auth-and-user-data.util";
import { useEffect } from "react";

const AppLoader = ({ children }) => {
  const accessToken = localStorage.getItem("token");

  useEffect(() => {
    setAuthAndUserData();
  }, [accessToken]);

  return children;
};

export default AppLoader;
