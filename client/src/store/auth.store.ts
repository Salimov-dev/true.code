import {
  IAccessDecodedToken,
  ILogin,
  IRegister
} from "@interfaces/auth.interface";
import authService from "@services/auth.service";
import { handleHttpError } from "@utils/errors/handle-http.error";
import { validateAndDecodeToken } from "@utils/token/validate-and-decode-token.util";
import { create } from "zustand";

interface IUseAuthStore {
  isAuth: boolean;
  authUser: IAccessDecodedToken;
  isLoading: boolean;
  error: null | unknown;
  login: (loginData: ILogin) => Promise<string | void>;
  register: (registerData: ILogin) => void;
  logout: () => void;
}

const useAuthStore = create<IUseAuthStore>((set) => ({
  isAuth: false,
  authUser: null,
  isLoading: false,
  error: null,

  login: (loginData: ILogin) => {
    set({ isLoading: true, error: null });

    return authService
      .login(loginData)
      .then((data) => {
        const accessToken: string = data.accessToken;

        if (!accessToken) {
          throw new Error("Токены не найдены");
        }

        set({ isAuth: true });

        localStorage.setItem("token", accessToken);

        const decodedToken = validateAndDecodeToken(accessToken);

        if (!decodedToken) {
          throw new Error("Токены не найдены");
        }

        set({ authUser: decodedToken });

        return accessToken;
      })
      .catch((error: unknown) => {
        handleHttpError(error, "Ошибка при попытке входа", true);
        set({ error });
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },

  register: (registerData: IRegister) => {
    set({ isLoading: true, error: null });

    authService
      .register(registerData)
      .then(() => {
        useAuthStore.getState().login({
          userName: registerData.userName,
          password: registerData.password
        });
      })
      .catch((error: unknown) => {
        handleHttpError(error, "Ошибка при попытке регистрации", true);
        set({ error });
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },

  logout: () => {
    set({ isLoading: true, error: null });
    authService
      .logout()
      .then(() => {
        localStorage.removeItem("token");
        set({ isAuth: false });
      })
      .catch((error: unknown) => {
        handleHttpError(error, "Ошибка при попытке выхода");
        set({ error });
      })
      .finally(() => {
        set({ isLoading: false });
      });
  }
}));

export default useAuthStore;
