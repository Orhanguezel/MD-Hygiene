import { Outlet } from "react-router-dom";
import UserHeader from "@/components/user/UserHeader";
import Footer from "@/components/user/Footer";
import { LayoutContainer, MainContent } from "@/styles/userLayoutStyles.js";

const UserLayout = () => {
  return (
    <LayoutContainer>
      <UserHeader />
      <div style={{ display: "flex", flex: 1 }}>
        <MainContent>
          <Outlet />
        </MainContent>
      </div>
      <Footer />
    </LayoutContainer>
  );
};

export default UserLayout;
