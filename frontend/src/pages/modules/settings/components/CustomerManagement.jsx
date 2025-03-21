import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchCustomers,
  addCustomer,
  updateCustomerInfo,
  deleteCustomer,
} from "@/features/customer/customerSlice";
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
import { toast } from "react-toastify";

const CustomerManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { texts } = useLanguage();
  const { customers, status, error } = useSelector((state) => state.customer);

  // 📌 Müşteri Bilgileri için State
  const [customerData, setCustomerData] = useState({
    _id: null,
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      postalCode: "",
      country: "",
    },
  });

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  // 📌 **Input Değişikliklerini Yönetme**
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("address.")) {
      const addressField = name.split(".")[1]; // Örn: address.street
      setCustomerData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setCustomerData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // 📌 **Müşteri Kaydetme (Ekleme veya Güncelleme)**
  const handleSave = () => {
    if (!customerData.companyName || !customerData.contactName || !customerData.email) {
      toast.error("❌ " + texts.customer.missingFields);
      return;
    }

    if (customerData._id) {
      dispatch(updateCustomerInfo(customerData))
        .unwrap()
        .then(() => toast.success("✅ " + texts.customer.updated))
        .catch(() => toast.error("❌ " + texts.customer.updateFailed));
    } else {
      dispatch(addCustomer(customerData))
        .unwrap()
        .then(() => toast.success("✅ " + texts.customer.added))
        .catch(() => toast.error("❌ " + texts.customer.addFailed));
    }

    setCustomerData({
      _id: null,
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      address: { street: "", city: "", postalCode: "", country: "" },
    });
  };

  // 📌 **Müşteri Bilgilerini Düzenleme**
  const handleEdit = (customer) => {
    setCustomerData(customer);
  };

  // 📌 **Müşteri Silme İşlemi**
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

      {/* 📌 Firma Adı */}
      <label>{texts.customer.companyName}:</label>
      <FormInput type="text" name="companyName" value={customerData.companyName} onChange={handleInputChange} />

      {/* 📌 Yetkili Kişi */}
      <label>{texts.customer.contactName}:</label>
      <FormInput type="text" name="contactName" value={customerData.contactName} onChange={handleInputChange} />

      {/* 📌 E-Mail */}
      <label>{texts.customer.email}:</label>
      <FormInput type="email" name="email" value={customerData.email} onChange={handleInputChange} />

      {/* 📌 Telefon */}
      <label>{texts.customer.phone}:</label>
      <FormInput type="text" name="phone" value={customerData.phone} onChange={handleInputChange} />

      {/* 📌 Adres Bilgileri */}
      <label>{texts.customer.address}:</label>
      <FormInput type="text" name="address.street" value={customerData.address.street} onChange={handleInputChange} placeholder={texts.customer.street} />
      <FormInput type="text" name="address.city" value={customerData.address.city} onChange={handleInputChange} placeholder={texts.customer.city} />
      <FormInput type="text" name="address.postalCode" value={customerData.address.postalCode} onChange={handleInputChange} placeholder={texts.customer.postalCode} />
      <FormInput type="text" name="address.country" value={customerData.address.country} onChange={handleInputChange} placeholder={texts.customer.country} />

      {/* 📌 Kaydet Butonu */}
      <ActionButton onClick={handleSave}>
        {customerData._id ? "✏️ " + texts.customer.update : "➕ " + texts.customer.add}
      </ActionButton>

      {/* 📌 Müşteri Listesi */}
      <h3>📋 {texts.customer.list}</h3>
      {status === "loading" ? (
        <p>⏳ {texts.customer.loading}</p>
      ) : error ? (
        <p>❌ {texts.customer.error}</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>{texts.customer.companyName}</th>
              <th>{texts.customer.contactName}</th>
              <th>{texts.customer.email}</th>
              <th>{texts.customer.phone}</th>
              <th>{texts.customer.address}</th>
              <th>{texts.customer.actions}</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map((customer) => (
                <TableRow key={customer._id}>
                  <TableCell>{customer._id}</TableCell>
                  <TableCell>{customer.companyName}</TableCell>
                  <TableCell>{customer.contactName || "—"}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{`${customer.address.street}, ${customer.address.city}, ${customer.address.postalCode}, ${customer.address.country}`}</TableCell>
                  <TableCell>
                    <EditButton onClick={() => handleEdit(customer)}>✏️ {texts.customer.edit}</EditButton>
                    <DeleteButton onClick={() => handleDelete(customer._id)}>🗑️ {texts.customer.delete}</DeleteButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>⚠️ {texts.customer.noRecords}</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}

      {/* 📌 Geri Dön Butonu */}
      <BackButton onClick={() => navigate("/settings")}>⬅️ {texts.general.back}</BackButton>
    </Container>
  );
};

export default CustomerManagement;
