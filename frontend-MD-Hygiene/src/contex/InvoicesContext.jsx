// ✅ InvoicesContext.js
import { createContext, useReducer, useContext } from "react";
import { invoicesReducer, initialInvoicesState } from "./invoicesReducer";
import invoicesData from "../data/invoices.json";

const InvoicesContext = createContext();

export const InvoicesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(invoicesReducer, { invoices: invoicesData });

  const addInvoice = (invoice) => {
    dispatch({ type: "ADD_INVOICE", payload: invoice });
  };

  const deleteInvoice = (id) => {
    dispatch({ type: "DELETE_INVOICE", payload: id });
  };

  return (
    <InvoicesContext.Provider value={{ invoices: state.invoices, addInvoice, deleteInvoice }}>
      {children}
    </InvoicesContext.Provider>
  );
};

export const useInvoices = () => {
  const context = useContext(InvoicesContext);
  if (!context) {
    throw new Error("useInvoices must be used within an InvoicesProvider");
  }
  return context;
};
