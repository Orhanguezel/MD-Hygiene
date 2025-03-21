import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCompanyInfo, updateCompanyInfo } from "@/features/company/companySlice";
import { useLanguage } from "@/features/language/useLanguage";
import { FormInput, ActionButton, Container, BackButton } from "../styles/settingsStyles";
import { toast } from "react-toastify";

const CompanyManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { texts } = useLanguage(); // ✅ Dil desteği eklendi
  const { company, status } = useSelector((state) => state.company);

  const [companyData, setCompanyData] = useState({
    companyName: "",
    email: "",
    phone: "",
    taxNumber: "",
    handelsregisterNumber: "",
    address: {
      street: "",
      city: "",
      postalCode: "",
      country: "",
    },
    bankDetails: {
      bankName: "",
      iban: "",
      swiftCode: "",
    },
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

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({
      ...prev,
      address: { ...prev.address, [name]: value },
    }));
  };

  const handleBankChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({
      ...prev,
      bankDetails: { ...prev.bankDetails, [name]: value },
    }));
  };

  const handleSave = () => {
    if (!companyData?._id) {
      toast.error("🚨 Güncelleme başarısız! Şirket ID eksik.");
      return;
    }

    dispatch(updateCompanyInfo(companyData))
      .unwrap()
      .then(() => toast.success("✅ " + texts.company.updated))
      .catch(() => toast.error("❌ " + texts.company.updateFailed));
  };

  if (status === "loading") return <p>⏳ {texts.company.loading}</p>;

  return (
    <Container>
      <h2>🏢 {texts.company.title}</h2>

      <label>{texts.company.name}:</label>
      <FormInput type="text" name="companyName" value={companyData.companyName} onChange={handleInputChange} />

      <label>{texts.company.email}:</label>
      <FormInput type="email" name="email" value={companyData.email} onChange={handleInputChange} />

      <label>{texts.company.phone}:</label>
      <FormInput type="text" name="phone" value={companyData.phone} onChange={handleInputChange} />

      <label>{texts.company.taxNumber}:</label>
      <FormInput type="text" name="taxNumber" value={companyData.taxNumber} onChange={handleInputChange} />

      <label>{texts.company.handelsregisterNumber}:</label> {/* ✅ Yeni alan eklendi */}
      <FormInput type="text" name="handelsregisterNumber" value={companyData.handelsregisterNumber} onChange={handleInputChange} />

      {/* 📌 Adres Bilgileri */}
      <h3>📍 {texts.company.address}</h3>

      <label>{texts.company.street}:</label>
      <FormInput type="text" name="street" value={companyData.address.street} onChange={handleAddressChange} />

      <label>{texts.company.city}:</label>
      <FormInput type="text" name="city" value={companyData.address.city} onChange={handleAddressChange} />

      <label>{texts.company.postalCode}:</label>
      <FormInput type="text" name="postalCode" value={companyData.address.postalCode} onChange={handleAddressChange} />

      <label>{texts.company.country}:</label>
      <FormInput type="text" name="country" value={companyData.address.country} onChange={handleAddressChange} />

      {/* 📌 Banka Bilgileri */}
      <h3>🏦 {texts.company.bankDetails}</h3>

      <label>{texts.company.bankName}:</label>
      <FormInput type="text" name="bankName" value={companyData.bankDetails.bankName} onChange={handleBankChange} />

      <label>{texts.company.bankIban}:</label>
      <FormInput type="text" name="iban" value={companyData.bankDetails.iban} onChange={handleBankChange} />

      <label>{texts.company.bankBic}:</label>
      <FormInput type="text" name="swiftCode" value={companyData.bankDetails.swiftCode} onChange={handleBankChange} />

      {/* 📌 Kaydet & Geri Dön Butonları */}
      <ActionButton onClick={handleSave}>💾 {texts.company.save}</ActionButton>
      <BackButton onClick={() => navigate("/settings")}>⬅️ {texts.general.back}</BackButton>
    </Container>
  );
};

export default CompanyManagement;
