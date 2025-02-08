import React, { useState } from "react";
import OfferForm from "./OfferForm";

const OfferPage = () => {
  const [offerData, setOfferData] = useState(null);

  const handleFormSubmit = (data) => {
    setOfferData(data);
    console.log("Oluşturulan Teklif:", data); // API entegrasyonu için buraya ekleme yapılabilir.
  };

  return (
    <div>
      <OfferForm onSubmit={handleFormSubmit} />
      {offerData && (
        <div>
          <h2>Teklif Önizleme</h2>
          <p><strong>Firma Adı:</strong> {offerData.companyName}</p>
          <p><strong>Yetkili:</strong> {offerData.contactPerson}</p>
          <p><strong>IBAN:</strong> {offerData.iban}</p>
          <p><strong>BIC:</strong> {offerData.bic}</p>

          <h3>Ürünler:</h3>
          <ul>
            {offerData.products.map((item, index) => (
              <li key={index}>
                {item.productName} - {item.quantity} Adet - {item.unitPrice} €
              </li>
            ))}
          </ul>

          <h4>Toplam Tutarlar:</h4>
          <p>Net: {offerData.totals.netAmount.toFixed(2)} €</p>
          <p>KDV: {offerData.totals.taxAmount.toFixed(2)} €</p>
          <p>Brüt: {offerData.totals.grossAmount.toFixed(2)} €</p>
        </div>
      )}
    </div>
  );
};

export default OfferPage;
