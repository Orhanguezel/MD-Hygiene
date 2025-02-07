import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    signout();
    navigate("/login");
  }, [signout, navigate]);

  return <p>Çıkış yapılıyor...</p>;
};

export default Logout;
