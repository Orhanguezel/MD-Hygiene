// src/pages/modules/offer/components/OfferPDF.jsx
import React from "react";

const OfferPDF = () => {
  const handleGeneratePDF = () => {
    console.log("PDF oluşturuluyor...");
    alert("PDF başarıyla oluşturuldu!");
  };

  return (
    <div>
      <h2>Teklif PDF Görüntüle</h2>
      <button onClick={handleGeneratePDF}>PDF Oluştur</button>
    </div>
  );
};

export default OfferPDF;
