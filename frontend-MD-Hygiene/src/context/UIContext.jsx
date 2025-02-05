import { createContext, useState, useContext } from "react";

// ✅ Context oluştur
const UIContext = createContext();

// ✅ Provider (Menü ve dropdown durumlarını yönetecek)
export const UIProvider = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <UIContext.Provider value={{ isSidebarOpen, setSidebarOpen, isDropdownOpen, setDropdownOpen }}>
      {children}
    </UIContext.Provider>
  );
};

// ✅ Custom Hook ile erişimi kolaylaştır
export const useUI = () => useContext(UIContext);
