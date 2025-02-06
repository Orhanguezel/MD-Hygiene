export const initialTheme = localStorage.getItem("theme") || "light";

export const themeReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_THEME":
      const newTheme = state === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    default:
      return state;
  }
};
