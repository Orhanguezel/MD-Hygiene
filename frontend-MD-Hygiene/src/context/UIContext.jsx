import { createContext, useReducer, useContext } from "react";

const UIContext = createContext();

const uiReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_SIDEBAR":
      return { sidebarOpen: !state.sidebarOpen };
    default:
      return state;
  }
};

export const UIProvider = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, { sidebarOpen: true });

  const toggleSidebar = () => {
    dispatch({ type: "TOGGLE_SIDEBAR" });
  };

  return (
    <UIContext.Provider value={{ sidebarOpen: state.sidebarOpen, toggleSidebar }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  return useContext(UIContext);
};

export default UIContext;
