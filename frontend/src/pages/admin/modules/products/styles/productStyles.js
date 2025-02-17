import styled from "styled-components";

/* ✅ Ürün Yönetim Konteyneri */
export const ProductContainer = styled.div`
  width: calc(100% - 570px);;
  margin-top: 10px;
  @media (max-width: 1020px) {
    margin-left: 40px;
    margin-top: 170px;
    flex-direction: column;
    align-items: center;
    padding-top: 150px;
    width: 100%;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 10px;
  }
`;

export const ProductTitle = styled.h1`
  @media (max-width: 768px) {
    font-size: 18px;
    text-align: center;
    margin: 20px 0;
    margin-left: 0; /* Küçük ekranda margin sıfır */
  }
`;

/* ✅ Sidebar */
/* ✅ Ürün Paneli */
export const SidebarContainer = styled.div`
  width: 250px;
  background: rgba(255, 255, 255, 0.12); /* Hafif şeffaf */
  backdrop-filter: blur(20px); /* Daha güçlü blur efekti */
  color: ${({ theme }) => theme.text};
  padding: 20px;
  height: auto;
  position: absolute;
  top: 50px;
  left: 50px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15); /* Daha belirgin gölge */
  border-radius: 16px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }

  /* 📌 Tablet Görünümü */
  @media (max-width: 1024px) {
    width: 90%;
    top: 70px;
    left: 50px;
  }

  /* 📌 Mobil Görünüm */
  @media (max-width: 768px) {
    position: absolute;
    border-radius: 0;
    padding: 15px;
  }
`;

/* ✅ Sidebar Başlık */
export const SidebarTitle = styled.h3`
  color: ${({ theme }) => theme.text};
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  padding-bottom: 10px;
  border-bottom: 2px solid ${({ theme }) => theme.primary};
`;

/* ✅ Sidebar Butonları */
export const SidebarButton = styled.button`
  padding: 14px 18px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  border-radius: 12px;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  box-shadow: 0 4px 12px ${({ theme }) => theme.shadow};

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 6px 15px ${({ theme }) => theme.shadow};
  }

  svg {
    font-size: 18px;
  }
`;

/* ✅ Kategori Kartlarını Listeleme */
export const CategoryListContainer = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding: 15px;
  margin-bottom: 10px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

/* ✅ Kategori Kartı */
export const CategoryCard = styled.button.attrs((props) => ({
  $isActive: props.$isActive ? "true" : undefined,
}))`
  flex: 0 0 140px;
  height: 120px;
  background: ${({ $isActive, theme }) =>
    $isActive === "true" ? theme.primary : theme.cardBackground};
  color: ${({ $isActive, theme }) =>
    $isActive === "true" ? theme.buttonText : theme.text};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 10px ${({ theme }) => theme.shadow};
  transition: all 0.3s ease;
  text-align: center;

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
    transform: scale(1.08);
  }

  img {
    width: 40px;
    height: 40px;
    object-fit: contain;
    margin-bottom: 8px;
  }
`;

/* ✅ Ürün Kartlarını Listeleme */
export const ListContainer = styled.div`
  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
    padding: 10px;
    justify-content: center;
  }
`;

/* ✅ Ürün Kartı */
export const ProductItem = styled.div`
  @media (max-width: 768px) {
    width: calc(100% - 10px);
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

/* ✅ Ürün Resmi */
export const ProductImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: contain;
  border-radius: 8px;
  background: ${({ theme }) => theme.inputBackground};
  margin-bottom: 8px;
`;

/* ✅ Ürün Detayları */
export const ProductDetails = styled.div`
  padding: 8px;
  color: ${({ theme }) => theme.text};
`;

/* ✅ Ürün İsmi */
export const ProductName = styled.h3`
  font-size: 14px;
  font-weight: bold;
`;

/* ✅ Ürün Fiyatı */
export const ProductPrice = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
`;

/* ✅ Ürün Stok Bilgisi */
export const ProductStock = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.text};
`;

/* ✅ Sepete Ekle Butonu */
export const AddToCartButton = styled.button`
  padding: 8px;
  background: #dc3545;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
  font-size: 14px;

  &:hover {
    background: #c82333;
  }
`;

/* ✅ Kategori Butonları */
export const CategoryButtonContainer = styled.div`
  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

/* ✅ Kategori Butonu */
export const CategoryButton = styled.button.attrs((props) => ({
  $isActive: props.$isActive ? "true" : undefined,
}))`
  padding: 10px 15px;
  background: ${({ $isActive, theme }) =>
    $isActive === "true" ? theme.primary : theme.cardBackground};
  color: ${({ $isActive, theme }) =>
    $isActive === "true" ? theme.buttonText : theme.text};
  border: ${({ $isActive, theme }) =>
    $isActive === "true"
      ? `2px solid ${theme.primaryHover}`
      : "2px solid transparent"};
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 3px 6px ${({ theme }) => theme.shadow};

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
  }
`;

/* ✅ Silme Butonu */
export const DeleteButton = styled.button`
  background: #dc3545;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #c82333;
  }
`;

/* ✅ Form */
export const FormContainer = styled.form`
  max-width: 500px;
  background: ${({ theme }) => theme.cardBackground};
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px ${({ theme }) => theme.shadow};
`;

/* ✅ Form Input */
export const FormInput = styled.input`
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputText};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  font-size: 14px;
`;

/* ✅ Form Gönder Butonu */
export const SubmitButton = styled.button`
  padding: 10px 20px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
    transform: scale(1.05);
  }
`;

/* ✅ Stok Güncelleme Konteyneri */
export const ManageStockContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
  background: ${({ theme }) => theme.background};
`;

/* ✅ Stok Güncelleme Input */
export const StockInput = styled.input`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputText};
`;

/* ✅ Ürün Güncelleme Butonu */
export const SaveButton = styled(SubmitButton)`
  margin-top: 10px;
  background: #28a745;

  &:hover {
    background: #218838;
  }
`;
