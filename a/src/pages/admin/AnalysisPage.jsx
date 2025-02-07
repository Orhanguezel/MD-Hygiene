import { useState, useEffect } from "react";
import { API } from "../../services/api"; 
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { FaChartLine, FaUsers, FaShoppingCart } from "react-icons/fa";
import {
  AnalysisContainer,
  SectionTitle,
  ChartsWrapper,
  ChartBox,
  LoadingMessage,
  ErrorMessage
} from "../../styles/AnalysisStyles";

const Analysis = () => {
  const [salesData, setSalesData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataAndAnalyze = async () => {
      setLoading(true);
      setError(null);

      try {
        // 📌 1️⃣ Tüm API çağrılarını paralel olarak alalım
        const [ordersRes, invoicesRes, usersRes] = await Promise.all([
          fetch(API.ORDERS),
          fetch(API.INVOICES),
          fetch(API.USERS),
        ]);

        if (!ordersRes.ok || !invoicesRes.ok || !usersRes.ok) {
          throw new Error("❌ API-Daten konnten nicht geladen werden!");
        }

        const orders = await ordersRes.json();
        const invoices = await invoicesRes.json();
        const users = await usersRes.json();

        console.log("📌 Siparişler:", orders);
        console.log("📌 Faturalar:", invoices);
        console.log("📌 Kullanıcılar:", users);

        // 📌 2️⃣ Satış analizini oluştur
        const monthlySales = {};
        invoices.forEach((invoice) => {
          const month = new Date(invoice.createdAt).toLocaleString("de-DE", { month: "short" });
          monthlySales[month] = (monthlySales[month] || 0) + invoice.totalAmount;
        });

        const salesChartData = Object.keys(monthlySales).map((month) => ({
          month,
          totalSales: monthlySales[month],
        }));

        setSalesData(salesChartData);

        // 📌 3️⃣ Yeni müşteri analizini oluştur
        const monthlyCustomers = {};
        users.forEach((user) => {
          const month = new Date(user.createdAt).toLocaleString("de-DE", { month: "short" });
          monthlyCustomers[month] = (monthlyCustomers[month] || 0) + 1;
        });

        const customerChartData = Object.keys(monthlyCustomers).map((month) => ({
          month,
          newCustomers: monthlyCustomers[month],
        }));

        setCustomerData(customerChartData);

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDataAndAnalyze();
  }, []);

  return (
    <AnalysisContainer>
      <SectionTitle>📊 Geschäftsanalyse</SectionTitle>

      {loading && <LoadingMessage>📊 Analysen werden geladen...</LoadingMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}

      {!loading && !error && (
        <ChartsWrapper>
          {/* ✅ Satış Analizi */}
          <ChartBox>
            <h3><FaShoppingCart /> Umsatzanalyse</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="totalSales" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </ChartBox>

          {/* ✅ Müşteri Analizi */}
          <ChartBox>
            <h3><FaUsers /> Kundenanalyse</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={customerData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="newCustomers" fill="#16a34a" />
              </BarChart>
            </ResponsiveContainer>
          </ChartBox>
        </ChartsWrapper>
      )}
    </AnalysisContainer>
  );
};

export default Analysis;
