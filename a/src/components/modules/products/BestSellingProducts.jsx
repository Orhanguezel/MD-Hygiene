import { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { getBestSellingProducts } from "../../api/analyticsApi";
import { Table, TableRow, TableHeader, TableData } from "../../styles/dashboardStyles";

const BestSellingProducts = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchBestSellers = async () => {
      if (!user?.token) return;
      try {
        const data = await getBestSellingProducts(user.token);
        setProducts(data);
      } catch (error) {
        console.error("En çok satan ürünler alınamadı:", error);
      }
    };

    fetchBestSellers();
  }, [user]);

  return (
    <div>
      <h3>🔥 En Çok Satan Ürünler</h3>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Ürün Adı</TableHeader>
            <TableHeader>Satış Sayısı</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableData>{product.name}</TableData>
              <TableData>{product.sales}</TableData>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BestSellingProducts;
