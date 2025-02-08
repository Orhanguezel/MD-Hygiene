// ✅ uiReducer.js
export const initialUIState = {
    sidebarOpen: true,
    modalOpen: false,
    loading: false,
  };
  
  export const uiReducer = (state, action) => {
    switch (action.type) {
      case "TOGGLE_SIDEBAR":
        return { ...state, sidebarOpen: !state.sidebarOpen };
      case "TOGGLE_MODAL":
        return { ...state, modalOpen: !state.modalOpen };
      case "SET_LOADING":
        return { ...state, loading: action.payload };
      default:
        return state;
    }
  };
  