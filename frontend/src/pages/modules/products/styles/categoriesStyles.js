import styled from "styled-components";

/* ✅ Ürün Yönetim Konteyneri */
export const ProductContainer = styled.div`
  width: calc(100% - 570px);
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
  color: ${({ theme }) => theme.text};

  @media (max-width: 768px) {
    font-size: 18px;
    text-align: center;
    margin: 20px 0;
    margin-left: 0;
  }
`;

/* ✅ Sidebar */
export const SidebarContainer = styled.div`
  width: 250px;
  background: ${({ theme }) => theme.sidebarBackground};
  color: ${({ theme }) => theme.sidebarText};
  padding: 20px;
  height: auto;
  position: absolute;
  top: 70px;
  left: 50px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-shadow: 0 8px 20px ${({ theme }) => theme.shadow};
  border-radius: 16px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 10px 25px ${({ theme }) => theme.shadow};
  }

  @media (max-width: 1024px) {
    width: 90%;
    top: 70px;
    left: 50px;
  }

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

/* ✅ Kategori Yönetimi */
export const CategoryContainer = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.text};
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 10px ${({ theme }) => theme.shadow};
`;

/* ✅ Kategori Kartları */
export const CategoryCard = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border: 1px solid ${({ theme }) => theme.border};
  padding: 15px;
  margin-top: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px ${({ theme }) => theme.shadow};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 250px;
`;

/* ✅ Kategori Resmi */
export const CategoryImage = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

/* ✅ Kategori Başlığı */
export const CategoryTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;

/* ✅ Kategori Butonları */
export const EditButton = styled.button`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.buttonText};
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
  }
`;

export const DeleteButton = styled(EditButton)`
  background: #dc3545;

  &:hover {
    background: #c82333;
  }
`;

/* ✅ Kategori Form */
export const CategoryForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
`;

/* ✅ Input Alanları */
export const InputField = styled.input`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputText};
`;



/* ✅ Responsive Liste */
export const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  padding: 20px;
  background: ${({ theme }) => theme.background};
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

  p {
    font-size: 13px;
    color: ${({ theme }) => theme.text};
  }
`;

/* ✅ Sepete Ekle Butonu */
export const AddToCartButton = styled.button`
  padding: 8px;
  background: ${({ theme }) => theme.warning};
  color: white;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.warningHover};
  }
`;

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

/* ✅ Ürün Kartı */

export const FileUploadButton = styled.button`
  padding: 10px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
  }
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const ImagePreviewContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

export const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
`;
