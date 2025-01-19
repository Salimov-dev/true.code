import { httpService } from "./http.service";

const uploadEndPoint = "upload";
const deleteEndPoint = "upload/delete";

const uploadService = {
  upload: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await httpService.post(uploadEndPoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return data;
  },

  deleteFile: async (fileUrl: string) => {
    try {
      const { data } = await httpService.post(deleteEndPoint, { fileUrl });
      return data;
    } catch (error) {
      throw new Error(`Не удалось удалить файл: ${error.message}`);
    }
  }
};

export default uploadService;
