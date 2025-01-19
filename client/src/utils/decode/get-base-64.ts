import { UploadProps } from "antd";

/**
 * Функция для преобразования файла в строку Base64.
 * Используется FileReader API для чтения содержимого файла как data URL.
 *
 * @param file - файл, который нужно преобразовать в строку Base64.
 * @returns Promise, который возвращает строку Base64 после успешного завершения операции.
 */

type FileType = Parameters<UploadProps["beforeUpload"]>[0];

export const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
