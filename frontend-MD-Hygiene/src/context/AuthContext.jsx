// ✅ AuthContext.js
import { createContext, useReducer, useContext, useEffect } from "react";
import { authReducer, initialAuthState } from "./authReducer";
import { getUserProfile } from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !state.user) {
      getUserProfile()
        .then((data) => dispatch({ type: "LOGIN", payload: { user: data, token } }))
        .catch((error) => {
          console.error("Authentication error:", error);
          dispatch({ type: "AUTH_ERROR", payload: error.message });
          dispatch({ type: "LOGOUT" });
        });
    } else {
      dispatch({ type: "AUTH_ERROR", payload: null }); // Token yoksa yükleme biter
    }
  }, []);

  const signin = (data) => dispatch({ type: "LOGIN", payload: data });
  const signout = () => dispatch({ type: "LOGOUT" });

  const isAdmin = state.user?.role === "admin";

  return (
    <AuthContext.Provider value={{ ...state, signin, signout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
