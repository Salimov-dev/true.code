import { Card, Flex } from "antd";
import { FC, useState } from "react";
import styled from "styled-components";
import { IProduct } from "@interfaces/product.interface";
import CoverProductCard from "./components/cover.product-card";
import HeaderProductCard from "./components/header.product-card";
import ContentProductCard from "./components/content.product-card ";
import FooterProductCard from "./components/footer.product-card";
import ProductDetailsPage from "@pages/product/product-details/product-details.page";
import DetailButtonProductCard from "./components/detail-button.product-card";

interface IProps {
  product: IProduct;
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
  pageSize: number;
  currentPage: number;
  sort: string;
  searchName: string;
  order: "asc" | "desc" | undefined;
}

const ProductDetails = styled(Flex)`
  height: 280px;
  justify-content: space-between;
  align-items: space-between;
`;

const CardComponent = styled(Card)`
  height: 100%;
  width: 100%;
`;

const ProductCard: FC<IProps> = ({
  product,
  setCurrentPage,
  pageSize,
  sort,
  searchName,
  currentPage,
  order
}): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenProductDetails = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <CardComponent hoverable cover={<CoverProductCard product={product} />}>
        <ProductDetails vertical>
          <HeaderProductCard product={product} />
          <DetailButtonProductCard
            onOpenProductDetails={handleOpenProductDetails}
          />

          <Flex vertical>
            <ContentProductCard product={product} />
            <FooterProductCard
              product={product}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pageSize={pageSize}
              sort={sort}
              order={order}
              searchName={searchName}
            />
          </Flex>
        </ProductDetails>
      </CardComponent>

      <ProductDetailsPage
        isModalOpen={isModalOpen}
        onCancel={handleModalClose}
        product={product}
      />
    </>
  );
};

export default ProductCard;
