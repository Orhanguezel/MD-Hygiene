const companyInfo = JSON.parse(localStorage.getItem("companyInfo")) || {
    name: "MD-Hygienelogistik GmbH",
    address: "Musterstraße 123, 40210 Düsseldorf, Germany",
    taxNumber: "DE123456789",
    registrationNumber: "HRB 987654",
    iban: "DE89 3704 0044 0532 0130 00",
    bic: "COBADEFFXXX",
    email: "info@md-hygienelogistik.de",
    phone: "+49 211 12345678",
    website: "www.md-hygienelogistik.de",
  };
  
  
  export default companyInfo;
  