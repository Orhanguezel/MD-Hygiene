import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideMenu from "./SideMenu";
import Footer from "./Footer";
import styled from "styled-components";

const LayoutContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 10fr;
  background-color: #f3f4f6;
  min-height: 100vh;
`;

const Sidebar = styled.div`
  height: 100vh;
  position: sticky;
  top: 0;
  display: flex;
`;

const Content = styled.div`
  padding: 20px;
`;

function Layout() {
  return (
    <>
      <div className="md:h-16">
        <Header />
      </div>
      <LayoutContainer>
        <Sidebar>
          <SideMenu />
        </Sidebar>
        <Content>
          <Outlet />
        </Content>
      </LayoutContainer>
      <Footer/>
    </>
  );
}

export default Layout;
