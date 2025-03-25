import { useEffect, useState } from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";
import VisitorRoutes from "./routes/VisitorRoutes";
import { useLanguage } from "./features/language/useLanguage";
import { useTheme } from "./features/theme/useTheme"; // ✅ Tema desteği
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { user, isAuthenticated, loading, error } = useSelector((state) => state.auth);
  const { texts } = useLanguage();
  const { theme } = useTheme(); // ✅ Tema desteği

  const [isAppLoading, setIsAppLoading] = useState(true);

  // ⏳ **Yükleme Ekranı (Global)**
  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        setIsAppLoading(false);
      }, 1500);
    }
  }, [loading]);

  if (isAppLoading) {
    return (
      <div style={{ textAlign: "center", justifyContent:"center", padding: "20px", color: theme.text, background: theme.background }}>
        <h3>{texts.app?.loading}</h3>
      </div>
    );
  }

  return (
    <BrowserRouter>
      {/* ✅ Hata mesajı gösterme */}
      {error && <div style={{ color: "red", textAlign: "center" }}>{error}</div>}

      <Routes>
        {isAuthenticated ? (
          user?.role === "admin" ? (
            <AdminRoutes />
          ) : (
            <UserRoutes />
          )
        ) : (
          <VisitorRoutes />
        )}
      </Routes>

      {/* ✅ ToastContainer eklendi */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme.mode} // 🌙 Tema desteği
        style={{ fontSize: "16px", fontWeight: "bold", textAlign: "center" }}
        className="custom-toast"
      />
    </BrowserRouter>
  );
};

export default App;
