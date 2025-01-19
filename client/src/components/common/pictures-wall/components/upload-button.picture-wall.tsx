import { PlusOutlined } from "@ant-design/icons";

const IMAGE_MAX_QUANTITY = 8;

const UploadButtonPictureWall = ({ fileList }) => {
  const isMaxLimitReached = fileList.length >= IMAGE_MAX_QUANTITY;

  return !isMaxLimitReached ? (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Загрузить</div>
    </button>
  ) : null;
};

export default UploadButtonPictureWall;
