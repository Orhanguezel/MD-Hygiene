// src/pages/modules/offer/components/SetShippingCost.jsx
import React, { useState } from "react";

const SetShippingCost = () => {
  const [shippingCost, setShippingCost] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Nakliye Ücreti:", shippingCost);
    alert(`Nakliye ücreti ${shippingCost} ₺ olarak belirlendi.`);
  };

  return (
    <div>
      <h2>Nakliye Ücreti Belirle</h2>
      <form onSubmit={handleSubmit}>
        <label>Nakliye Ücreti (₺):</label>
        <input
          type="number"
          value={shippingCost}
          onChange={(e) => setShippingCost(e.target.value)}
          required
        />
        <button type="submit">Kaydet</button>
      </form>
    </div>
  );
};

export default SetShippingCost;
