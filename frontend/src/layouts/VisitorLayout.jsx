import { Outlet } from "react-router-dom";
import VisitorHeader from "@/components/visitor/VisitorHeader";
import Footer from "@/components/common/Footer";
import { LayoutContainer, MainContent } from "./styles/LayoutStyles.js";

const VisitorLayout = () => {
  return (
    <LayoutContainer>
      <VisitorHeader />
      <div style={{ display: "flex", flex: 1 }}>
        <MainContent>
          <Outlet />
        </MainContent>
      </div>
      <Footer />
    </LayoutContainer>
  );
};

export default VisitorLayout;
