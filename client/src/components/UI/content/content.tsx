import { Layout } from "antd";
import styled from "styled-components";

const Component = styled(Layout.Content)`
  text-align: center;
  min-height: 120;
  line-height: 120px;
  color: #fff;
  background-color: #0958d9;
`;

const Content = () => {
  return <Component>Content</Component>;
};

export default Content;
