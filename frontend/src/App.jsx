import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";
import VisitorRouter from "./routes/VisitorRoutes";
import { useLanguage } from "./features/language/useLanguage";

const App = () => {
  const { user, isAuthenticated, loading, error } = useSelector((state) => state.auth);
  const { texts } = useLanguage();
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        setIsAppLoading(false);
      }, 1500);
    }
  }, [loading]);

  if (isAppLoading) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h3>{texts.app?.loading || "⏳ Yükleniyor, lütfen bekleyin..."}</h3>
      </div>
    );
  }

  return (
    <BrowserRouter>
      {error && <div style={{ color: "red", textAlign: "center" }}>{error}</div>}

      <Routes>
        {isAuthenticated ? (
          user?.role === "admin" ? (
            <Route path="/*" element={<AdminRoutes />} />
          ) : (
            <Route path="/*" element={<UserRoutes />} />
          )
        ) : (
          <Route path="/*" element={<VisitorRouter />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
