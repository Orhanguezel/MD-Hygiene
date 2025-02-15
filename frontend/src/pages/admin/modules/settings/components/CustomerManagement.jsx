import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers, addCustomer, updateCustomerInfo, deleteCustomer } from "@/features/customer/customerSlice";
import { FormInput, ActionButton, Container, Table, TableRow, TableCell, EditButton, DeleteButton } from "../styles/settingsStyles";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

const CustomerManagement = () => {
  const dispatch = useDispatch();
  const { customers, status } = useSelector((state) => state.customer);

  // 📌 Form için müşteri verisi (Firma ve yetkili kişi bilgisi ile)
  const [customerData, setCustomerData] = useState({
    id: null,
    companyName: "",
    contactPerson: "", // Yetkili kişi (Opsiyonel)
    address: "",
    phone: "",
  });

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  // 📌 Input değişikliklerini yakalama
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prev) => ({ ...prev, [name]: value }));
  };

  // 📌 Firma Ekleme veya Güncelleme
  const handleSave = () => {
    if (!customerData.companyName) {
      toast.error("❌ Firma ismi zorunludur!");
      return;
    }

    const customerToSave = {
      ...customerData,
      id: customerData.id || uuidv4(), // ✅ ID eksikse oluştur
    };

    if (customerData.id) {
      dispatch(updateCustomerInfo(customerToSave))
        .unwrap()
        .then(() => toast.success("✅ Firma bilgileri güncellendi!"))
        .catch(() => toast.error("❌ Güncelleme başarısız oldu!"));
    } else {
      dispatch(addCustomer(customerToSave))
        .unwrap()
        .then(() => toast.success("✅ Yeni firma eklendi!"))
        .catch(() => toast.error("❌ Ekleme başarısız oldu!"));
    }

    setCustomerData({ id: null, companyName: "", contactPerson: "", address: "", phone: "" });
  };

  // 📌 Firma Düzenleme
  const handleEdit = (customer) => {
    setCustomerData(customer);
  };

  // 📌 Firma Silme
  const handleDelete = (id) => {
    if (!id) {
      toast.error("❌ Geçersiz ID!");
      return;
    }
    dispatch(deleteCustomer(id))
      .unwrap()
      .then(() => toast.success("✅ Firma başarıyla silindi!"))
      .catch(() => toast.error("❌ Silme işlemi başarısız oldu!"));
  };

  return (
    <Container>
      <h2>🏢 Firma Yönetimi</h2>

      {/* 📝 Firma Formu */}
      <label>Firma Adı:</label>
      <FormInput type="text" name="companyName" value={customerData.companyName} onChange={handleInputChange} required />
      
      <label>Yetkili Kişi (Opsiyonel):</label>
      <FormInput type="text" name="contactPerson" value={customerData.contactPerson} onChange={handleInputChange} />

      <label>Adres:</label>
      <FormInput type="text" name="address" value={customerData.address} onChange={handleInputChange} />

      <label>Telefon:</label>
      <FormInput type="text" name="phone" value={customerData.phone} onChange={handleInputChange} />

      <ActionButton onClick={handleSave}>
        {customerData.id ? "✏️ Güncelle" : "➕ Firma Ekle"}
      </ActionButton>

      {/* 📋 Firma Listesi */}
      <h3>📋 Firma Listesi</h3>
      {status === "loading" ? (
        <p>⏳ Firmalar yükleniyor...</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Firma Adı</th>
              <th>Yetkili Kişi</th>
              <th>Adres</th>
              <th>Telefon</th>
              <th>İşlemler</th>
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
                    <EditButton onClick={() => handleEdit(customer)}>✏️ Düzenle</EditButton>
                    <DeleteButton onClick={() => handleDelete(customer.id)}>🗑️ Sil</DeleteButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>⚠️ Henüz kayıtlı firma yok.</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default CustomerManagement;
