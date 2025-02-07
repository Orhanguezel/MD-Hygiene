import { useEffect, useState, useContext } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import AuthContext from "../../../context/AuthContext";
import { getUserOrders } from "../../api/orderApi";

const OrderReports = () => {
  const { user } = useContext(AuthContext);
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    const fetchReportData = async () => {
      if (!user?.token) return;
      try {
        const orders = await getUserOrders(user.token);
        const monthlyReport = orders.reduce((acc, order) => {
          const month = order.date.substring(0, 7);
          acc[month] = (acc[month] || 0) + order.total;
          return acc;
        }, {});

        const formattedData = Object.keys(monthlyReport).map((month) => ({
          month,
          totalSales: monthlyReport[month],
        }));

        setReportData(formattedData);
      } catch (error) {
        console.error("Rapor verileri alınamadı:", error);
      }
    };

    fetchReportData();
  }, [user]);

  return (
    <div>
      <h3>📊 Sipariş Raporları</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={reportData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#ddd" />
          <Line type="monotone" dataKey="totalSales" stroke="#2563eb" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrderReports;
