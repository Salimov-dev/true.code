import { Image } from "antd";

const PreviewImagePictureWall = ({
  previewImage,
  previewOpen,
  setPreviewOpen,
  setPreviewImage
}) => {
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
