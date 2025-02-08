// ✅ authReducer.js

export const initialAuthState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  loading: true,
  error: null,
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        error: null,
      };

    case "LOGOUT":
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
