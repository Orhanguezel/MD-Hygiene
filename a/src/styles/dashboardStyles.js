import styled from "styled-components";

export const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
  background-color: #f9f9f9;
`;

export const StatCard = styled.div`
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const StatTitle = styled.h3`
  font-size: 1.4rem;
  color: #444;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const StatValue = styled.p`
  font-size: 2rem;
  font-weight: bold;
  color: #1a73e8;
  margin: 0;
`;

export const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const LoadingMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #777;
  padding: 20px;
`;

export const ErrorMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: red;
  background: #ffe5e5;
  padding: 15px;
  border-radius: 8px;
`;

export const IconWrapper = styled.div`
  font-size: 2.5rem;
  color: ${(props) => props.color || "#000"};
  margin-bottom: 10px;
`;

export const Section = styled.section`
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

export const Title = styled.h2`
  font-size: 1.8rem;
  color: #222;
  margin-bottom: 15px;
  text-align: center;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f4f4f4;
  }
`;

export const TableHeader = styled.th`
  background-color: #1a73e8;
  color: #ffffff;
  padding: 12px;
  text-align: left;
`;

export const TableData = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #1a73e8;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1558b0;
  }
`;

export const StatusBadge = styled.span`
  padding: 5px 10px;
  background-color: ${(props) => (props.status === "active" ? "#4caf50" : "#f44336")};
  color: white;
  border-radius: 12px;
  font-weight: bold;
`;

export const Input = styled.input`
  padding: 10px;
  width: 100%;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

export const Select = styled.select`
  padding: 10px;
  width: 100%;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

export const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 1000;
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;




// Stat Cards
export const StatContainer = styled.div`
  display: flex;
  gap: 16px;
  justify-content: space-around;
  margin-bottom: 20px;
`;



export const DownloadButton = styled(Button)`
  background-color: #34d399;

  &:hover {
    background-color: #059669;
  }
`;

export const ReminderButton = styled(Button)`
  background-color: #f59e0b;

  &:hover {
    background-color: #d97706;
  }
`;

// Notifications
export const NotificationContainer = styled.div`
  background: #f3f4f6;
  padding: 15px;
  border-radius: 8px;
`;

export const NotificationItem = styled.div`
  background: white;
  padding: 10px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
`;

export const MarkAsReadButton = styled(Button)`
  background-color: #10b981;

  &:hover {
    background-color: #059669;
  }
`;

// Analytics
export const AnalyticsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// Filter & Inputs
export const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
`;

export const SearchInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const FilterButton = styled(Button)`
  background-color: #4f46e5;

  &:hover {
    background-color: #4338ca;
  }
`;

export const DateInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

// QR Code Styles
export const QRCodeContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

export const QRCodeImage = styled.img`
  width: 150px;
  height: 150px;
`;

export const GenerateButton = styled(Button)`
  background-color: #3b82f6;
  &:hover {
    background-color: #1d4ed8;
  }
`;

// 
  export const ScanResult = styled.p`
  padding: 10px;
  background-color: ${(props) => (props.success ? "#34d399" : "#f87171")};
  color: white;
  `;

   export const ScannerContainer =styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  `;


  export const ScanButton= styled(Button)`
  background-color: #3b82f6;
  &:hover {
    background-color: #1d4ed8;
  }
  `;



  