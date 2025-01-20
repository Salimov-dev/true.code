import { FC } from "react";
import config from "@config/config.json";
import { IProduct } from "@interfaces/product.interface";
import { Flex, Typography, Row, Col, Image } from "antd";

interface IProps {
  product: IProduct;
}

const ImageGalleryProductDetails: FC<IProps> = ({ product }): JSX.Element => {
  return (
    <Flex vertical style={{ marginTop: "20px" }}>
      <Typography.Text
        style={{ fontWeight: "bold", width: "100%", textAlign: "center" }}
      >
        Галерея изображений:
      </Typography.Text>
      <Row gutter={[16, 16]}>
        {product.images.map((image, index) => (
          <Col span={8} key={index}>
            <Image
              width="100%"
              src={`${config.baseURL}${image}`}
              alt={`product-image-${index}`}
              style={{ borderRadius: "8px" }}
            />
          </Col>
        ))}
      </Row>
    </Flex>
  );
};

export default ImageGalleryProductDetails;
