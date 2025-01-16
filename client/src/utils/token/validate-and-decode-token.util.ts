import { IAccessDecodedToken } from "@interfaces/auth.interface";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";

/**
 * Проверка токена на валидность и его декодирование
 * Декодирует JWT токен, проверяет его срок действия и возвращает информацию из токена,
 * если токен действителен, или null, если он истек.
 *
 * @param accessToken - JWT токен, который требуется проверить и декодировать.
 * @returns - Если токен действителен, возвращается объект с декодированными данными из токена (без поля `exp` и `iat`).
 *            Если токен истек, возвращается null.
 */

export const validateAndDecodeToken = (accessToken: string) => {
  if (!accessToken) {
    return null;
  }

  const decodedToken: IAccessDecodedToken = jwtDecode(accessToken);

  const today = dayjs();
  const expDate = dayjs(decodedToken.exp);
  const isExpired = expDate.isBefore(today);

  if (!isExpired) {
    return null;
  }

  delete decodedToken.exp;
  delete decodedToken.iat;

  return decodedToken;
};
