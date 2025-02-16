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
      .then(() => toast.success("✅ " + texts.company.updated))
      .catch(() => toast.error("❌ " + texts.company.updateFailed));
  };

  if (status === "loading") return <p>⏳ {texts.company.loading}</p>;

  return (
    <Container>
      <h2>🏢 {texts.company.title}</h2>
      <label>{texts.company.name}:</label>
      <FormInput type="text" name="name" value={companyData.name} onChange={handleInputChange} />

      <label>{texts.company.address}:</label>
      <FormInput type="text" name="address" value={companyData.address} onChange={handleInputChange} />

      <label>{texts.company.email}:</label>
      <FormInput type="email" name="email" value={companyData.email} onChange={handleInputChange} />

      <label>{texts.company.taxNumber}:</label>
      <FormInput type="text" name="taxNumber" value={companyData.taxNumber} onChange={handleInputChange} />

      <label>{texts.company.bankIban}:</label>
      <FormInput type="text" name="bankIban" value={companyData.bankIban} onChange={handleInputChange} />

      <label>{texts.company.bankBic}:</label>
      <FormInput type="text" name="bankBic" value={companyData.bankBic} onChange={handleInputChange} />

      <ActionButton onClick={handleSave}>💾 {texts.company.save}</ActionButton>
      <BackButton onClick={() => navigate("/settings")}>⬅️ {texts.general.back}</BackButton>
    </Container>
  );
};

export default CompanyManagement;
