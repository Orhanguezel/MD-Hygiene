import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanyInfo, updateCompanyInfo } from "@/features/company/companySlice";
import { FormInput, ActionButton, Container } from "../styles/settingsStyles";
import { toast } from "react-toastify";

const CompanyManagement = () => {
  const dispatch = useDispatch();
  const { company, status } = useSelector((state) => state.company);
  const [companyData, setCompanyData] = useState({
    id: 1,
    name: "",
    address: "",
    email: "",
    taxNumber: "",
    bankIban: "",
    bankBic: "",
  });

  useEffect(() => {
    dispatch(fetchCompanyInfo());
  }, [dispatch]);

  useEffect(() => {
    if (company) {
      setCompanyData(company);
    }
  }, [company]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    dispatch(updateCompanyInfo(companyData))
      .unwrap()
      .then(() => {
        toast.success("✅ Firma bilgileri güncellendi!");
      })
      .catch(() => {
        toast.error("❌ Güncelleme başarısız oldu!");
      });
  };

  if (status === "loading") return <p>⏳ Firma bilgileri yükleniyor...</p>;

  return (
    <Container>
      <h2>🏢 Kendi Şirket Bilgileri</h2>
      <label>Firma Adı:</label>
      <FormInput type="text" name="name" value={companyData.name} onChange={handleInputChange} />

      <label>Adres:</label>
      <FormInput type="text" name="address" value={companyData.address} onChange={handleInputChange} />

      <label>E-Posta:</label>
      <FormInput type="email" name="email" value={companyData.email} onChange={handleInputChange} />

      <label>Vergi Numarası:</label>
      <FormInput type="text" name="taxNumber" value={companyData.taxNumber} onChange={handleInputChange} />

      <label>Banka IBAN:</label>
      <FormInput type="text" name="bankIban" value={companyData.bankIban} onChange={handleInputChange} />

      <label>Banka BIC:</label>
      <FormInput type="text" name="bankBic" value={companyData.bankBic} onChange={handleInputChange} />

      <ActionButton onClick={handleSave}>💾 Kaydet</ActionButton>
    </Container>
  );
};

export default CompanyManagement;
