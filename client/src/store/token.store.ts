import { httpService } from "@services/http.service";
import tokenService from "@services/token.service";
import { handleHttpError } from "@utils/errors/handle-http.error";
import { AxiosError } from "axios";
import { create } from "zustand";

interface IUseTokenStore {
  isLoading: boolean;
  error: null | unknown;
  refreshTokens: (error: AxiosError) => void;
}

const useTokenStore = create<IUseTokenStore>((set) => ({
  isLoading: false,
  error: null,

  refreshTokens: async (error: AxiosError) => {
    set({ isLoading: true, error: null });
    try {
      const data = await tokenService.refreshTokens();
      const accessToken: string = data.accessToken;

      if (!accessToken) {
        throw new Error("Токены не найдены");
      }

      localStorage.setItem("token", accessToken);
      error.config.headers.Authorization = `Bearer ${accessToken}`;
      return httpService.request(error.config);
    } catch (error: unknown) {
      handleHttpError(error, "Ошибка при попытке входа");
      localStorage.removeItem("token");
      set({ error });
    } finally {
      set({ isLoading: false });
    }
  }
}));

export default useTokenStore;
