import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  const signin = (userData, callback) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    callback();
  };

  const signout = (callback) => {
    setUser(null);
    localStorage.removeItem("user");
    callback();
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
