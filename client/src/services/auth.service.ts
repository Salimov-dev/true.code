import { ILogin, IRegister } from "@interfaces/auth.interface";
import { IUser } from "@interfaces/user.interface";
import { httpService } from "./http.service";

interface ILoginResponse {
  accessToken: string;
}

const authEndPoint = "auth/";

const authService = {
  login: async (loginData: ILogin): Promise<ILoginResponse> => {
    const { data } = await httpService.post(`${authEndPoint}login`, loginData);

    return data;
  },

  register: async (registerData: IRegister): Promise<IUser> => {
    const { data } = await httpService.post(
      `${authEndPoint}register`,
      registerData
    );
    return data;
  },

  logout: async () => {
    await httpService.get(`${authEndPoint}logout`);
  }
};

export default authService;
