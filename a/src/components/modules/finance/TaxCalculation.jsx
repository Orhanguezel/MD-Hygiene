import { useState } from "react";
import { calculateGermanVAT } from "../../utils/taxUtils";
import {
  FormContainer,
  Input,
  Select,
  SubmitButton,
  ResultBox,
} from "../../styles/dashboardStyles";

const TaxCalculation = () => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("standart");
  const [result, setResult] = useState(null);

  const handleCalculateTax = () => {
    const taxData = calculateGermanVAT(parseFloat(amount), category);
    setResult(taxData);
  };

  return (
    <FormContainer>
      <h4>📊 Vergi Hesaplama</h4>
      <Input type="number" placeholder="Tutar (€)" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <Select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="standart">Standart (%19)</option>
        <option value="gıda">Gıda / Kitap (%7)</option>
      </Select>
      <SubmitButton onClick={handleCalculateTax}>Hesapla</SubmitButton>

      {result && (
        <ResultBox>
          <p><strong>KDV Oranı:</strong> %{(result.taxRate * 100).toFixed(2)}</p>
          <p><strong>KDV Tutarı:</strong> €{result.taxAmount.toFixed(2)}</p>
          <p><strong>Toplam:</strong> €{result.totalWithTax.toFixed(2)}</p>
        </ResultBox>
      )}
    </FormContainer>
  );
};

export default TaxCalculation;
