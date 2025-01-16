import useAuthStore from "@store/auth.store";
import { validateAndDecodeToken } from "@utils/token/validate-and-decode-token.util";

const accessToken = localStorage.getItem("token");

const setAuthAndUserData = () => {
  if (!accessToken) {
    return;
  }

  const decodedToken = validateAndDecodeToken(accessToken);

  if (!decodedToken) {
    return;
  }

  useAuthStore.setState({ isAuth: true, authUser: decodedToken });
};

export default setAuthAndUserData;
