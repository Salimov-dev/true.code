import { notification } from "antd";
import { AxiosError } from "axios";

/**
 *
 * @param error ошибка, может быть AxiosError | Error
 * @param defaultMessage сообщение по умолчанию
 * @param print boolean, отображать ли уведомление об ошибке
 */

export const handleHttpError = (
  error: unknown,
  defaultMessage = "Неизвестная ошибка",
  print = false
) => {
  let errorMessage = defaultMessage;

  if (error instanceof AxiosError) {
    const responseErrorMessage = error.response.data.message;

    if (responseErrorMessage) {
      errorMessage = Array.isArray(responseErrorMessage)
        ? responseErrorMessage.join(", ")
        : responseErrorMessage;
    } else if (error.message) {
      errorMessage = error.message;
    }
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  if (print) {
    notification.error({
      message: defaultMessage,
      description: errorMessage
    });
  }
};
