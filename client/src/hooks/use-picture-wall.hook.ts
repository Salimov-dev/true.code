import { FormInstance, Modal, UploadFile, UploadProps } from "antd";
import uploadService from "@services/upload.service";
import { UploadRequestOption } from "@interfaces/upload.interface";
import useProductStore from "@store/product.store";
import { getBase64 } from "@utils/decode/get-base-64";
import { IProduct } from "@interfaces/product.interface";
import { Dispatch, SetStateAction } from "react";

type FileType = Parameters<UploadProps["beforeUpload"]>[0];

interface IUsePictureWallProps {
  form: FormInstance;
  fileList: UploadFile[];
  initialValues?: IProduct;
  setPreviewOpen: Dispatch<SetStateAction<boolean>>;
  setPreviewImage: Dispatch<SetStateAction<string>>;
  setTemporaryImages: Dispatch<SetStateAction<string[]>>;
  setFileList: Dispatch<SetStateAction<UploadFile[]>>;
}

const usePictureWall = ({
  form,
  fileList,
  initialValues,
  setPreviewOpen,
  setPreviewImage,
  setTemporaryImages,
  setFileList
}: IUsePictureWallProps) => {
  const { updateProduct, fetchProductById } = useProductStore();

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleUploadImage: UploadProps["customRequest"] = ({
    file,
    onSuccess,
    onError
  }: UploadRequestOption) => {
    uploadService
      .upload(file as File)
      .then((response) => {
        const url = response.url;
        const images = form.getFieldValue("images") || [];
        const newImages = [...images, url];

        form.setFieldsValue({ images: newImages });

        setTemporaryImages((prev) => [...prev, url]);
        onSuccess(response, file);
      })
      .catch((error) => {
        onError(error);
      });
  };

  const handleRemoveImage = (fileUrl: UploadFile) => {
    const { confirm } = Modal;

    const uploadedImage = fileUrl?.response?.url;
    const savedImage = fileUrl?.uid;
    const imageToDelete = fileUrl?.response ? uploadedImage : savedImage;

    return new Promise<boolean>((resolve, reject) => {
      confirm({
        title: "Подтвердите удаление",
        content: `Вы уверены, что хотите безвозвратно удалить изображение?`,
        onOk: async () => {
          try {
            if (!imageToDelete) {
              reject(false);
              return;
            }

            const res = await uploadService.deleteFile(imageToDelete);
            const currentImages = initialValues.images || [];
            const newImages = currentImages.filter(
              (url: string) => url !== res.fileUrl
            );

            form.setFieldsValue({ images: newImages });

            const newFileList = fileList.filter(
              (file) => file.uid !== fileUrl.uid
            );
            setFileList(newFileList);

            const updatedProduct = await fetchProductById(initialValues.id);
            const formattedProduct = {
              ...updatedProduct,
              images: newImages
            };

            updateProduct(initialValues.id, formattedProduct);
            resolve(true);
          } catch (error) {
            console.error("Ошибка при удалении файла:", error);
            reject(false);
          }
        },
        onCancel: () => {
          reject(false);
        }
      });
    });
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  return { handlePreview, handleUploadImage, handleRemoveImage, handleChange };
};

export default usePictureWall;
