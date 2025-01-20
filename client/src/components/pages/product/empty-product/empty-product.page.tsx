import { FrownOutlined } from "@ant-design/icons";
import { Flex, Typography } from "antd";
import { FC } from "react";
import styled from "styled-components";

const Component = styled(Flex)`
  width: 100%;
  height: 60vh;
  justify-content: center;
  align-items: center;
  color: black;
`;

const EmptyProductsPage: FC = (): JSX.Element => {
  return (
    <Component vertical>
      <Typography.Title>
        Не найдено ни одного товара {<FrownOutlined />}
      </Typography.Title>
      <Typography.Title>
        нажмите кнопки "Сгенерировать товары" или "Добавить товар"
      </Typography.Title>
    </Component>
  );
};

export default EmptyProductsPage;
