import styled from "styled-components";

// 📌 Sayfa Konteyneri
export const AnalysisContainer = styled.div`
  margin-top: 100px;
  padding: 30px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  background: #f9fafb;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

// 📌 Sayfa Başlığı
export const SectionTitle = styled.h2`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  color: #1f2937;
  margin-bottom: 20px;
`;

// 📌 Yükleme ve Hata Mesajları
export const LoadingMessage = styled.p`
  text-align: center;
  font-size: 18px;
  color: #4f46e5;
`;

export const ErrorMessage = styled.p`
  text-align: center;
  font-size: 18px;
  color: red;
`;

// 📌 Grafikler Konteyneri
export const ChartsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  margin-top: 20px;
`;

// 📌 Grafik Kutusu
export const ChartBox = styled.div`
  width: 100%;
  max-width: 600px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;

  h3 {
    font-size: 20px;
    color: #333;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
`;
