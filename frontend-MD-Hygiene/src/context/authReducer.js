export const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    loading: true,
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
        };
  
      case "LOGOUT":
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return { ...state, user: null, token: null, loading: false };
  
      case "SET_USER":
        return { ...state, user: action.payload, loading: false };
  
      case "AUTH_LOADING":
        return { ...state, loading: action.payload };
  
      default:
        return state;
    }
  };
  