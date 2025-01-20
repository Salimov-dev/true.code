import { FC, useEffect, useState } from "react";
import { Upload } from "antd";
import type { FormInstance, UploadFile } from "antd";
import config from "@config/config.json";
import { IProduct } from "@interfaces/product.interface";
import { UploadFileStatus } from "antd/es/upload/interface";
import PreviewImagePictureWall from "./components/preview-image.picture-wall";
import UploadButtonPictureWall from "./components/upload-button.picture-wall";
import usePictureWall from "@hooks/use-picture-wall.hook";

interface IProps {
  form: FormInstance;
  initialValues?: IProduct;
  setTemporaryImages: (value: string[]) => void;
}

const PicturesWall: FC<IProps> = ({
  form,
  initialValues,
  setTemporaryImages
}): JSX.Element => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const { handlePreview, handleUploadImage, handleRemoveImage, handleChange } =
    usePictureWall({
      form,
      fileList,
      initialValues,
      setPreviewOpen,
      setPreviewImage,
      setTemporaryImages,
      setFileList
    });

  useEffect(() => {
    const initialImages = initialValues?.images || [];
    const initialFileList = initialImages.map((url: string) => ({
      uid: url,
      name: url.split("/").pop() || "image.jpg",
      status: "done" as UploadFileStatus,
      url: `${config.baseURL}${url}`
    }));

    setFileList(initialFileList);
  }, [initialValues]);

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        customRequest={handleUploadImage}
        onRemove={handleRemoveImage}
      >
        <UploadButtonPictureWall fileList={fileList} />
      </Upload>

      <PreviewImagePictureWall
        previewImage={previewImage}
        previewOpen={previewOpen}
        setPreviewOpen={setPreviewOpen}
        setPreviewImage={setPreviewImage}
      />
    </>
  );
};

export default PicturesWall;
