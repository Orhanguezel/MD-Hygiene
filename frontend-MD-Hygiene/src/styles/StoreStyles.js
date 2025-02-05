import styled from "styled-components";

/* 📌 Genel Konteyner */
export const StoreContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

/* 📌 Başlık Alanı */
export const StoreHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #1f2937;
  color: white;
  padding: 15px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
`;

/* 📌 Mağaza Listesi */
export const StoreList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
`;

/* 📌 Kart Yapısı */
export const StoreCard = styled.div`
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

/* 📌 Mağaza Resmi */
export const StoreImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 6px;
`;

/* 📌 Mağaza Bilgileri */
export const StoreInfo = styled.div`
  padding: 10px;
`;

/* 📌 Mağaza İsmi */
export const StoreTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;

/* 📌 Mağaza Konum */
export const StoreLocation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  color: #555;
  font-size: 14px;
`;

/* 📌 Buton */
export const StoreButton = styled.button`
  background: #007bff;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;

  &:hover {
    background: #0056b3;
  }
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

