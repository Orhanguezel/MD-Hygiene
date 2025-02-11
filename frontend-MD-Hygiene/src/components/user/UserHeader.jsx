import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme";
import { logout } from "@/features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import {
  HeaderContainer,
  Logo,
  Nav,
  Name,
  Button,
  ProfileSection,
  ProfileDropdown,
  ProfileImage,
  ThemeToggleButton,
} from "@/styles/userHeaderStyles";
import { FaUserCircle, FaSun, FaMoon, FaSignOutAlt } from "react-icons/fa";
import logo from "@/assets/logo.png";

export default function UserHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { language, setLanguage, texts } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { user } = useSelector((state) => state.auth);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleProfileClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <HeaderContainer>
      <Link to="/">
        <Logo src={logo} alt="MD-Hygienelogistik" />
        <Name>MD-Hygienelogistik
      </Name>
      </Link>

      <Nav>
        <ThemeToggleButton onClick={toggleTheme}>
          {theme === "light" ? <FaMoon size={18} /> : <FaSun size={18} />}
        </ThemeToggleButton>

        <ProfileSection onClick={handleProfileClick}>
          {user?.profileImage ? (
            <ProfileImage src={user.profileImage} alt={user.name} />
          ) : (
            <FaUserCircle size={24} />
          )}
          <span>{user?.name || "Kullanıcı"}</span>

          {dropdownOpen && (
            <ProfileDropdown>
              <Link to="/profile">{texts?.profile?.title || "Profilim"}</Link>
              <Button onClick={handleLogout}>
                <FaSignOutAlt /> {texts?.logout || "Çıkış Yap"}
              </Button>
            </ProfileDropdown>
          )}
        </ProfileSection>
      </Nav>
    </HeaderContainer>
  );
}
