import { useState, useContext } from "react";
import AuthContext from "../AuthContext";
import { API } from "../services/api";
import { FaUserCog, FaLock, FaMoon, FaSun } from "react-icons/fa";
import {
  SettingsContainer,
  SettingsHeader,
  SettingsList,
  SettingsItem,
  SettingsIcon,
  ToggleSwitch,
  SaveButton,
} from "../styles/SettingsStyles";

const Settings = () => {
  const { user } = useContext(AuthContext);
  const [darkMode, setDarkMode] = useState(false);
  const [password, setPassword] = useState("");

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handlePasswordChange = async () => {
    if (!password) return alert("Bitte geben Sie ein neues Passwort ein!");
    
    try {
      const response = await fetch(`${API.USERS}/update-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) throw new Error("Passwort konnte nicht aktualisiert werden!");

      alert("🔑 Passwort erfolgreich geändert!");
      setPassword("");
    } catch (error) {
      console.error("Fehler beim Ändern des Passworts:", error);
    }
  };

  return (
    <SettingsContainer>
      <SettingsHeader>⚙️ Einstellungen</SettingsHeader>
      <SettingsList>
        <SettingsItem>
          <SettingsIcon>
            <FaUserCog />
          </SettingsIcon>
          <span>Benutzername: {user?.firstName} {user?.lastName}</span>
        </SettingsItem>

        <SettingsItem>
          <SettingsIcon>
            <FaMoon />
          </SettingsIcon>
          <span>Dunkler Modus</span>
          <ToggleSwitch checked={darkMode} onChange={handleDarkModeToggle} />
        </SettingsItem>

        <SettingsItem>
          <SettingsIcon>
            <FaLock />
          </SettingsIcon>
          <span>Passwort ändern</span>
          <input
            type="password"
            placeholder="Neues Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <SaveButton onClick={handlePasswordChange}>Speichern</SaveButton>
        </SettingsItem>
      </SettingsList>
    </SettingsContainer>
  );
};

export default Settings;
