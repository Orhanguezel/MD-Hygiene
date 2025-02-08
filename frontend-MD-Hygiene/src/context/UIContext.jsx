// ✅ UIContext.js
import { createContext, useContext, useReducer } from "react";
import { uiReducer, initialUIState } from "./uiReducer"; // Reducer import

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, initialUIState);

  const toggleSidebar = () => {
    dispatch({ type: "TOGGLE_SIDEBAR" });
  };

  const toggleModal = () => {
    dispatch({ type: "TOGGLE_MODAL" });
  };

  const setLoading = (isLoading) => {
    dispatch({ type: "SET_LOADING", payload: isLoading });
  };

  return (
    <UIContext.Provider
      value={{
        sidebarOpen: state.sidebarOpen,
        modalOpen: state.modalOpen,
        loading: state.loading,
        toggleSidebar,
        toggleModal,
        setLoading,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
};
