export const initialLanguage = localStorage.getItem("language") || "tr";

export const languageReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_LANGUAGE":
      localStorage.setItem("language", action.payload);
      return action.payload;
    default:
      return state;
  }
};
