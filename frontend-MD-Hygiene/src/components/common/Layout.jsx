import { useAuth } from "@/features/auth/useAuth";  // ✅ RTK Hook kullanımı
import CommonSidebar from "./CommonSidebar";
import CommonHeader from "./CommonHeader";

const Layout = ({ children }) => {
  const { user } = useAuth(); // ✅ RTK üzerinden kullanıcı bilgisi çekiliyor

  if (!user) {
    return children; // 🚩 Giriş yapılmamışsa sadece çocukları göster
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
