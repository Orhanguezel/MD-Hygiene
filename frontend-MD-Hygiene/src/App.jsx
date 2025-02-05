import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import styled from "styled-components";
import AuthContext from "./AuthContext";
import ProtectedWrapper from "./components/ProtectedWrapper";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import Inventory from "./pages/Inventory";
import Orders from "./pages/Orders"; 
import Products from "./pages/Products"; 
import Users from "./pages/Users"; 
import Shipments from "./pages/Shipments"; 
import Sales from "./pages/Sales";
import Store from "./pages/Store";
import ReportsPage from "./pages/Reports";
import InvoicePage from "./pages/InvoicePage";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import PurchaseDetails from "./pages/PurchaseDetails";
import Analysis from "./pages/AnalysisPage";
import NotFound from "./pages/NotFound";

const LoaderContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const App = () => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser || null);
    setLoader(false);
  }, []);

  const signin = (newUser, callback) => {
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
    callback && callback();
  };

  const signout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  let value = { user, signin, signout };

  if (loader)
    return (
      <LoaderContainer>
        <h1>LOADING...</h1>
      </LoaderContainer>
    );

  return (
    <AuthContext.Provider value={value}>
      <BrowserRouter>
        <Routes>
          {/* ✅ Ana Sayfa - Kullanıcı giriş yapmışsa Admin Paneline yönlendir */}
          <Route path="/" element={user ? <Navigate to="/admin/dashboard" /> : <Home />} />

          {/* ✅ Admin Paneli (Giriş yapmış kullanıcılar için koruma) */}
          <Route path="/admin" element={<ProtectedWrapper />}>
            <Route index element={<Navigate to="dashboard" />} /> {/* /admin -> /admin/dashboard */}
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="purchase-details" element={<PurchaseDetails />} />
            <Route path="sales" element={<Sales />} />
            <Route path="store" element={<Store />} />
            <Route path="orders" element={<Orders />} />
            <Route path="products" element={<Products />} />
            <Route path="users" element={<Users />} />
            <Route path="shipments" element={<Shipments />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="settings" element={<Settings />} />
            <Route path="invoices" element={<InvoicePage />} />
            <Route path="analysis" element={<Analysis />} />
            <Route path="/admin/profile" element={<Profile />} />
          </Route>

          {/* ✅ Sayfa bulunamazsa */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
