import styled from "styled-components";

/* 📌 Genel Konteyner */
export const DashboardContainer = styled.div`
  margin-top: 100px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: center;
  
`;

export const Title = styled.h1`
  font-size: 30px;
  font-weight: bold;
`;

/* 📌 İstatistik Kartları Konteyneri */
export const StatContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

/* 📌 Kart */
export const StatCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

/* 📌 Başlık */
export const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin: 10px 0;
`;

/* 📌 Değer */
export const Value = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #007bff;
`;

/* 📌 İkon Konteyneri */
export const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
`;

/* 📌 Hata Mesajı */
export const ErrorMessage = styled.div`
  color: red;
  font-weight: bold;
  text-align: center;
`;

/* 📌 Yükleme Mesajı */
export const LoadingMessage = styled.div`
  color: #007bff;
  font-weight: bold;
  text-align: center;
`;
