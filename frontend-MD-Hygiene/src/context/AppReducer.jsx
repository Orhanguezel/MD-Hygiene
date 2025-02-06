export const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    theme: localStorage.getItem("theme") || "light",
    language: localStorage.getItem("language") || "de",
  };
  
  export const appReducer = (state, action) => {
    switch (action.type) {
      case "SET_USER":
        localStorage.setItem("user", JSON.stringify(action.payload));
        return { ...state, user: action.payload };
  
      case "LOGOUT":
        localStorage.removeItem("user");
        return { ...state, user: null };
  
      case "TOGGLE_THEME":
        const newTheme = state.theme === "light" ? "dark" : "light";
        localStorage.setItem("theme", newTheme);
        return { ...state, theme: newTheme };
  
      case "SET_LANGUAGE":
        localStorage.setItem("language", action.payload);
        return { ...state, language: action.payload };
  
      default:
        return state;
    }
  };
  