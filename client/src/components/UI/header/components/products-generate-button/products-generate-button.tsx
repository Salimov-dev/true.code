import useProductStore from "@store/product.store";
import { Button } from "antd";
import { FC } from "react";

const ProductsGenerateButton: FC = (): JSX.Element => {
  const { generateRandomProducts } = useProductStore();

  const handleGenerate = () => {
    generateRandomProducts();
  };

  return (
    <Button type="primary" onClick={handleGenerate}>
      Сгенерировать товары
    </Button>
  );
};

export default ProductsGenerateButton;
