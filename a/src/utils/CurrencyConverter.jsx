import { useEffect, useState } from "react";
import { getExchangeRates } from "../../api/currencyApi";
import {
  CurrencyContainer,
  Select,
  AmountInput,
  ConvertButton,
  ResultBox,
} from "../../styles/dashboardStyles";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [currency, setCurrency] = useState("USD");
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const rates = await getExchangeRates();
        setConvertedAmount(amount * rates[currency]);
      } catch (error) {
        console.error("Döviz kuru alınamadı:", error);
      }
    };

    fetchExchangeRates();
  }, [amount, currency]);

  return (
    <CurrencyContainer>
      <h4>💱 Döviz Çevirici</h4>
      <AmountInput type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <Select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="GBP">GBP</option>
        <option value="TRY">TRY</option>
      </Select>
      <ConvertButton>Hesapla</ConvertButton>
      {convertedAmount && <ResultBox>Sonuç: {convertedAmount.toFixed(2)} {currency}</ResultBox>}
    </CurrencyContainer>
  );
};

export default CurrencyConverter;
