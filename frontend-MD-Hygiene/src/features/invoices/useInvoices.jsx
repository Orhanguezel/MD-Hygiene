// ✅ src/features/invoices/useInvoices.js
import { useDispatch, useSelector } from 'react-redux';
import { addInvoice, deleteInvoice } from './invoicesSlice';

export const useInvoices = () => {
  const dispatch = useDispatch();
  const invoices = useSelector((state) => state.invoices.invoices);

  const handleAddInvoice = (invoice) => {
    dispatch(addInvoice(invoice));
  };

  const handleDeleteInvoice = (id) => {
    dispatch(deleteInvoice(id));
  };

  return { invoices, addInvoice: handleAddInvoice, deleteInvoice: handleDeleteInvoice };
};