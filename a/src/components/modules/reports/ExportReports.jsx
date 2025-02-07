import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { exportToCSV, exportToPDF } from "../../../utils/exportUtils";
import { ExportContainer, ExportButton } from "../../styles/dashboardStyles";

const ExportReports = ({ data }) => {
  const { user } = useContext(AuthContext);

  return (
    <ExportContainer>
      <h4>📥 Rapor İndir</h4>
      <ExportButton onClick={() => exportToCSV(data, "rapor")}>CSV İndir</ExportButton>
      <ExportButton onClick={() => exportToPDF(data, "rapor")}>PDF İndir</ExportButton>
    </ExportContainer>
  );
};

export default ExportReports;
