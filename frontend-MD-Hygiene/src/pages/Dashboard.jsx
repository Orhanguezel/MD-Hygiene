import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthContext from "../AuthContext";

const DashboardContainer = styled.div`
  padding: 20px;
`;

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login"); // Kullanıcı yoksa giriş sayfasına yönlendir
      return;
    }
    setUserRole(storedUser.role); // Kullanıcının rolünü al
  }, [navigate]);

  if (!user) {
    return <h2>Loading...</h2>; // Kullanıcı yüklenirken bekleme ekranı
  }

  return (
    <DashboardContainer>
      <h1>Dashboard</h1>
      {userRole === "admin" ? (
        <p>Admin Paneline erişiminiz var! <br /> <a href="/admin-dashboard">Admin Dashboard'a Git</a></p>
      ) : (
        <p>Standart kullanıcı olarak giriş yaptınız.</p>
      )}
    </DashboardContainer>
  );
};

export default Dashboard;
