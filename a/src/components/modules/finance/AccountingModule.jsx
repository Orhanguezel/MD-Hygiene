import TaxCalculation from "./TaxCalculation";
import ExpenseAnalysis from "../reports/ExpenseAnalysis";

const AccountingModule = () => {
  return (
    <div>
      <h3>💰 Muhasebe Modülü</h3>
      <TaxCalculation />
      <ExpenseAnalysis />
    </div>
  );
};

export default AccountingModule;
