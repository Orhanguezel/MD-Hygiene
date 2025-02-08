import React from "react";
import { useOffers } from "@/context/OfferContext";

const OfferList = () => {
  const { offers, deleteOffer } = useOffers();

  return (
    <div>
      <h2>Teklif Listesi</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Müşteri</th>
            <th>Toplam Tutar (₺)</th>
            <th>Durum</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((offer) => (
            <tr key={offer.id}>
              <td>{offer.id}</td>
              <td>{offer.customer}</td>
              <td>{offer.totalAmount}</td>
              <td>{offer.status}</td>
              <td>
                <button onClick={() => deleteOffer(offer.id)}>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OfferList;

