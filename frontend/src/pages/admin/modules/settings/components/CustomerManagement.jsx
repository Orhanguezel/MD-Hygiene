import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCustomers, addCustomer, updateCustomerInfo, deleteCustomer } from "@/features/customer/customerSlice";
import { useLanguage } from "@/features/language/useLanguage";
import {
  FormInput,
  ActionButton,
  Container,
  Table,
  TableRow,
  TableCell,
  EditButton,
  DeleteButton,
  BackButton,
} from "../styles/settingsStyles";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

const CustomerManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { texts } = useLanguage();
  const { customers, status } = useSelector((state) => state.customer);

  const [customerData, setCustomerData] = useState({
    id: null,
    companyName: "",
    contactPerson: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!customerData.companyName) {
      toast.error("❌ " + texts.customer.missingCompanyName);
      return;
    }

    const customerToSave = {
      ...customerData,
      id: customerData.id || uuidv4(),
    };

    if (customerData.id) {
      dispatch(updateCustomerInfo(customerToSave))
        .unwrap()
        .then(() => toast.success("✅ " + texts.customer.updated))
        .catch(() => toast.error("❌ " + texts.customer.updateFailed));
    } else {
      dispatch(addCustomer(customerToSave))
        .unwrap()
        .then(() => toast.success("✅ " + texts.customer.added))
        .catch(() => toast.error("❌ " + texts.customer.addFailed));
    }

    setCustomerData({ id: null, companyName: "", contactPerson: "", address: "", phone: "" });
  };

  const handleEdit = (customer) => {
    setCustomerData(customer);
  };

  const handleDelete = (id) => {
    if (!id) {
      toast.error("❌ " + texts.customer.invalidId);
      return;
    }
    dispatch(deleteCustomer(id))
      .unwrap()
      .then(() => toast.success("✅ " + texts.customer.deleted))
      .catch(() => toast.error("❌ " + texts.customer.deleteFailed));
  };

  return (
    <Container>
      <h2>🏢 {texts.customer.title}</h2>

      <label>{texts.customer.companyName}:</label>
      <FormInput type="text" name="companyName" value={customerData.companyName} onChange={handleInputChange} />

      <label>{texts.customer.contactPerson}:</label>
      <FormInput type="text" name="contactPerson" value={customerData.contactPerson} onChange={handleInputChange} />

      <label>{texts.customer.address}:</label>
      <FormInput type="text" name="address" value={customerData.address} onChange={handleInputChange} />

      <label>{texts.customer.phone}:</label>
      <FormInput type="text" name="phone" value={customerData.phone} onChange={handleInputChange} />

      <ActionButton onClick={handleSave}>
        {customerData.id ? "✏️ " + texts.customer.update : "➕ " + texts.customer.add}
      </ActionButton>

      <h3>📋 {texts.customer.list}</h3>
      {status === "loading" ? (
        <p>⏳ {texts.customer.loading}</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>{texts.customer.companyName}</th>
              <th>{texts.customer.contactPerson}</th>
              <th>{texts.customer.address}</th>
              <th>{texts.customer.phone}</th>
              <th>{texts.customer.actions}</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.id}</TableCell>
                  <TableCell>{customer.companyName}</TableCell>
                  <TableCell>{customer.contactPerson || "—"}</TableCell>
                  <TableCell>{customer.address}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>
                    <EditButton onClick={() => handleEdit(customer)}>✏️ {texts.customer.edit}</EditButton>
                    <DeleteButton onClick={() => handleDelete(customer.id)}>🗑️ {texts.customer.delete}</DeleteButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>⚠️ {texts.customer.noRecords}</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
      <BackButton onClick={() => navigate("/settings")}>⬅️ {texts.general.back}</BackButton>
    </Container>
  );
};

export default CustomerManagement;
