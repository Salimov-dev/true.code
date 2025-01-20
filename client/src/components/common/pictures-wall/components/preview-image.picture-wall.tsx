import { Image } from "antd";
import { FC } from "react";

interface IProps {
  previewImage: string;
  previewOpen: boolean;
  setPreviewOpen: (visible: boolean) => void;
  setPreviewImage: (image: string) => void;
}

const PreviewImagePictureWall: FC<IProps> = ({
  previewImage,
  previewOpen,
  setPreviewOpen,
  setPreviewImage
}): JSX.Element => {
  return (
    previewImage && (
      <Image
        wrapperStyle={{ display: "none" }}
        preview={{
          visible: previewOpen,
          onVisibleChange: (visible) => setPreviewOpen(visible),
          afterOpenChange: (visible) => !visible && setPreviewImage("")
        }}
        src={previewImage}
      />
    )
  );
};

export default PreviewImagePictureWall;
