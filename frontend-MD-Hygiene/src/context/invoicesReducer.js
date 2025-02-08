// ✅ invoicesReducer.js
export const initialInvoicesState = {
    invoices: [],
  };
  
  export const invoicesReducer = (state, action) => {
    switch (action.type) {
      case "ADD_INVOICE":
        return { ...state, invoices: [action.payload, ...state.invoices] };
      case "DELETE_INVOICE":
        return { ...state, invoices: state.invoices.filter((inv) => inv.id !== action.payload) };
      default:
        return state;
    }
  };
  