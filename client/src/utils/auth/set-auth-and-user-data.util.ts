import useAuthStore from "@store/auth.store";
import { validateAndDecodeToken } from "@utils/token/validate-and-decode-token.util";

/**
 * Функция для получения токена из localStorage, его декодирования и установки данных пользователя в хранилище состояния.
 * Если токен отсутствует или некорректен, процесс завершится без изменений в состоянии.
 */

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
