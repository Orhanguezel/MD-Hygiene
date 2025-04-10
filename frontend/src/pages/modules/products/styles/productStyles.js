import styled from "styled-components";
/* ✅ Ürün Yönetim Konteyneri */
export const ProductContainer = styled.div`
  width: calc(100% - 570px);;
  margin-top: 20px;
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
  top: 70px;
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


/* ✅ İçerik Alanı */
export const ContentContainer = styled.div`
  flex-grow: 1;
  padding: 20px;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 12px;
  width: 100%;
  max-width: 1000px;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    padding: 15px;
  }
`;

/* ✅ Sayfa Başlığı */
export const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: left;
  color: ${({ theme }) => theme.text};

  @media (max-width: 768px) {
    font-size: 20px;
    text-align: center;
  }
`;
/* ✅ Sidebar Butonları */
export const SidebarButton = styled.button`
  padding: 12px 15px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  border-radius: 10px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  box-shadow: 0 3px 8px ${({ theme }) => theme.shadow};

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
    transform: scale(1.05);
  }

  svg {
    font-size: 16px;
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

export const ProductItem = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 20px;
  background: ${({ theme }) => theme.cardBackground};
  box-shadow: 0 2px 5px ${({ theme }) => theme.shadow};
  gap: 15px;
  
  /* Küçük ekranlar için tam genişlik */
  @media (max-width: 768px) {
    width: 100%;
    flex-direction: row;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    text-align: center;
  }
`;

/* ✅ Ürün Resmi */
export const ProductImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
  border-radius: 8px;
  background: ${({ theme }) => theme.inputBackground};

  @media (max-width: 480px) {
    width: 100px;
    height: 100px;
  }
`;

/* ✅ Ürün Bilgisi */
export const ProductDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;

  h3 {
    font-size: 16px;
    font-weight: bold;
    color: ${({ theme }) => theme.text};
  }

  span {
    font-size: 14px;
    font-weight: bold;
    color: ${({ theme }) => theme.primary};
  }
    h5{
    font-size: 16px;}

  p {
    font-size: 13px;
    color: ${({ theme }) => theme.text};
  }
`;

/* ✅ Çöp Kutusu Butonu */
export const DeleteButton = styled.button`
  background: #dc3545;
  color: white;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #c82333;
  }
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


/* ✅ Kategori Yönetimi Konteyneri */
export const CategoryContainer = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px ${({ theme }) => theme.shadow};
`;



/* ✅ Kategori Resmi */
export const CategoryImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
`;

/* ✅ Kategori Başlığı */
export const CategoryTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;

/* ✅ Form */
export const CategoryForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
`;

/* ✅ Input */
export const InputField = styled.input`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 6px;
`;

/* ✅ Düzenleme Butonu */
export const EditButton = styled.button`
  background: green;
`;


export const FormTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  resize: vertical;
  min-height: 80px;
`;

export const ImagePreviewContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

export const ImagePreview = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

export const FileInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const FileUploadButton = styled.label`
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

export const RemoveImageButton = styled.button`
  background: #dc3545;
  color: white;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #c82333;
  }
`;


