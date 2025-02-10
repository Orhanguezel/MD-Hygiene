import { useState } from "react";

const SetShippingCost = ({ onSetShipping }) => {
  const [shippingCost, setShippingCost] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSetShipping(shippingCost);
    alert(`Nakliye ücreti ${shippingCost} ₺ olarak belirlendi.`);
  };

  return (
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
  );
};

export default SetShippingCost;
