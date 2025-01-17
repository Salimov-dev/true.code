import { httpService } from "./http.service";

const uploadEndPoint = "upload";

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
  }
};

export default uploadService;
