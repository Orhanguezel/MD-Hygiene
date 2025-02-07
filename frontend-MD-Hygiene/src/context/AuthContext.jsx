import { createContext, useReducer, useContext, useEffect } from "react";
import { getUserProfile, logout as apiLogout } from "../api/authApi";

const AuthContext = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  loading: true,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return { ...state, user: action.payload.user, token: action.payload.token, loading: false, error: null };

    case "LOGOUT":
      apiLogout();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return { ...state, user: null, token: null, loading: false, error: null };

    case "SET_USER":
      return { ...state, user: action.payload, loading: false, error: null };

    case "AUTH_ERROR":
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && !state.user) {
      getUserProfile()
        .then((data) => dispatch({ type: "LOGIN", payload: { user: data, token } }))
        .catch((error) => {
          console.error("Authentication error:", error);
          dispatch({ type: "AUTH_ERROR", payload: error.message });
          dispatch({ type: "LOGOUT" });
        })
        .finally(() => {
          dispatch({ type: "AUTH_ERROR", payload: null }); // Hata sıfırlama
        });
    } else {
      dispatch({ type: "AUTH_ERROR", payload: null }); // Token yoksa da yükleme biter
    }
  }, []);

  const signin = (data) => dispatch({ type: "LOGIN", payload: data });
  const signout = () => dispatch({ type: "LOGOUT" });

  const isAdmin = state.user?.role === "admin"; // ✅ Admin yetkilendirme kontrolü

  return (
    <AuthContext.Provider value={{ ...state, signin, signout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
