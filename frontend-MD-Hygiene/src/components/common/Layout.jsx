import { useAuth } from "../../context/AuthContext";
import CommonSidebar from "./CommonSidebar";
import CommonHeader from "./CommonHeader";

const Layout = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return children; // Giriş yapılmamışsa sadece çocukları render et
  }

  return (
    <div style={{ display: "flex" }}>
      <CommonSidebar />
      <div style={{ flex: 1, marginLeft: "250px" }}>
        <CommonHeader />
        <main style={{ padding: "20px", marginTop: "80px" }}>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
