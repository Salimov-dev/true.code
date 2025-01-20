import { Layout } from "antd";
import { FC } from "react";
import styled from "styled-components";

const Component = styled(Layout.Footer)`
  text-align: center;
  color: #fff;
  background-color: #4096ff;
`;

const Footer: FC = (): JSX.Element => {
  return <Component>Footer</Component>;
};

export default Footer;
