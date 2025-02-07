import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import styled from "styled-components";

const ChartContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const salesData = [
  { month: "Ocak", sales: 4000 },
  { month: "Şubat", sales: 3000 },
  { month: "Mart", sales: 5000 },
  { month: "Nisan", sales: 7000 },
  { month: "Mayıs", sales: 6000 },
  { month: "Haziran", sales: 8000 },
];

export default function SalesChart() {
  return (
    <ChartContainer>
      <h3>📈 Aylık Satışlar</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={salesData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#ddd" />
          <Line type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
