import { FC, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import type { FormInstance, GetProp, UploadFile, UploadProps } from "antd";
import uploadService from "@services/upload.service";
import { UploadRequestOption } from "@interfaces/upload.interface";

interface IProps {
  form: FormInstance;
}

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

// TODO разбить на компоненты!
const PicturesWall: FC<IProps> = ({ form }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleCustomRequest: UploadProps["customRequest"] = ({
    file,
    onSuccess,
    onError
  }: UploadRequestOption) => {
    uploadService
      .upload(file as File)
      .then((response) => {
        const url = response.url;
        const images = form.getFieldValue("images") || [];
        form.setFieldsValue({ images: [...images, url] });
        onSuccess(response, file);
      })
      .catch((error) => {
        onError(error);
      });
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        customRequest={handleCustomRequest}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>

      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage("")
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default PicturesWall;
