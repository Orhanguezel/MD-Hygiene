import styled from "styled-components";

// 📌 Kategori Konteyneri (Ana Bölüm)
export const CategoryContainer = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  justify-content: center;
  flex-wrap: wrap;
  background: ${({ theme }) => theme.background};
`;

// 📌 Kategori Kartı
export const CategoryCard = styled.div`
  padding: 15px;
  background-color: ${({ theme, $active }) => ($active ? theme.primary : theme.cardBackground)};
  color: ${({ theme, $active }) => ($active ? theme.buttonText : theme.text)};
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 8px ${({ theme }) => theme.shadow};

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
    transform: scale(1.05);
  }
`;

// 📌 Kategori Görseli
export const CategoryImage = styled.img`
  width: 100%;
  height: 130px;
  object-fit: cover;
  border-radius: 5px;
`;

// 📌 Kategori Başlığı
export const CategoryTitle = styled.h3`
  padding: 10px;
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  font-weight: bold;
`;

// 📌 Kategori Açıklaması
export const CategoryDescription = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.subText};
  text-align: center;
`;

// 📌 Kategori Butonu
export const CategoryButton = styled.button`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
    transform: scale(1.05);
  }
`;

// 📌 Ürün Kartı
export const ProductCard = styled.div`
  min-width: 200px;
  flex: 0 0 auto;
  background: ${({ theme }) => theme.cardBackground};
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px ${({ theme }) => theme.shadow};
  transition: transform 0.3s ease;
  scroll-snap-align: start;

  &:hover {
    transform: translateY(-5px);
  }
`;

// 📌 Ürün Görseli
export const ProductImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
`;

// 📌 Ürün Başlığı
export const ProductTitle = styled.h3`
  font-size: 1rem;
  margin: 10px 0;
  color: ${({ theme }) => theme.text};
`;

// 📌 Ürün Fiyatı
export const ProductPrice = styled.p`
  color: ${({ theme }) => theme.primary};
  font-weight: bold;
`;

// 📌 Ürün Listesi
export const ProductList = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  justify-content: center;
  flex-wrap: wrap;
  background: ${({ theme }) => theme.background};
`;
