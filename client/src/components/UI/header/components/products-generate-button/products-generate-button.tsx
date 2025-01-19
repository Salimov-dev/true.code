import useProductStore from "@store/product.store";
import { Button } from "antd";

const ProductsGenerateButton = () => {
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
