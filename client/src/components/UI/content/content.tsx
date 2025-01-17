import useProductStore from "@store/product.store";
import { Image, Layout } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import config from "@config/config.json";
import { IProduct } from "@interfaces/product.interface";

const Component = styled(Layout.Content)`
  text-align: center;
  min-height: 120;
  line-height: 120px;
  color: #fff;
  background-color: #0958d9;
`;

const Content = () => {
  const { fetchProductById } = useProductStore();
  const [product, setProduct] = useState<IProduct>();
  console.log("product", product);

  useEffect(() => {
    const id = "b03d9c06-6971-4cd8-9a68-73c466515c3c";
    fetchProductById(id).then((res) => setProduct(res));
  }, [fetchProductById]);

  return (
    <Component>
      {product?.images && product.images.length > 0 ? (
        product?.images?.map((image: string, index: number) => {
          const baseUrl = config.baseURL;
          const path = `${baseUrl}${image}`;

          return (
            <Image
              key={index}
              width={200}
              src={path}
              alt={`Product image ${index + 1}`}
              style={{ marginBottom: 16 }}
            />
          );
        })
      ) : (
        <p>No images available</p>
      )}
    </Component>
  );
};

export default Content;
