import { httpService } from "./http.service";

interface IRefreshTokensResponse {
  accessToken: string;
}

const tokenEndPoint = "token/";

const tokenService = {
  refreshTokens: async (): Promise<IRefreshTokensResponse> => {
    const { data } = await httpService.get(`${tokenEndPoint}refresh-tokens`);

    return data;
  }
};

export default tokenService;
