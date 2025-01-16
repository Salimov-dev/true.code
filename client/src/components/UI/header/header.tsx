import { Layout } from "antd";
import styled from "styled-components";
import ProjectHeaderSection from "./components/project-section/project-section.header";
import UserHeaderActionsSection from "./components/user-actions-section/user-actions-section.header";

const Component = styled(Layout.Header)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
`;

const Header = () => {
  return (
    <Component>
      <ProjectHeaderSection />
      <UserHeaderActionsSection />
    </Component>
  );
};

export default Header;
