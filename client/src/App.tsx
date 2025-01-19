import { Layout } from "antd";
import styled from "styled-components";
import Header from "@UI/header/header";
import Content from "@UI/content/content";
import Footer from "@UI/footer/footer";
import AppLoader from "./hoc/app-loader.hoc";

const Application = styled(Layout)`
  width: 100%;
  min-height: 100vh;
  height: 100%;
`;

function App() {
  return (
    <Application>
      <AppLoader>
        <Header />
        <Content />
        <Footer />
      </AppLoader>
    </Application>
  );
}

export default App;
