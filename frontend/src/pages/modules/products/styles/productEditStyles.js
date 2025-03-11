import styled from "styled-components";

/* ✅ Ürün Güncelleme Formu Konteyneri */
export const EditFormContainer = styled.form`
  max-width: 600px;
  background: ${({ theme }) => theme.cardBackground};
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px ${({ theme }) => theme.shadow};
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

/* ✅ Giriş Alanları */
export const EditFormInput = styled.input`
  width: 100%;
  padding: 12px;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputText};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  font-size: 14px;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    outline: none;
  }
`;

/* ✅ Açıklama Alanı */
export const EditTextarea = styled.textarea`
  width: 100%;
  padding: 12px;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputText};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  font-size: 14px;
  resize: vertical;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    outline: none;
  }
`;

/* ✅ Kategori & Ölçü Birimi Dropdown */
export const EditSelect = styled.select`
  width: 100%;
  padding: 10px;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  font-size: 14px;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    outline: none;
  }
`;

/* ✅ Form Etiketleri */
export const EditLabel = styled.label`
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;

/* ✅ Gönder Butonu */
export const EditSubmitButton = styled.button`
  padding: 12px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.buttonText};
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
  font-weight: bold;

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
    transform: scale(1.05);
  }
`;

/* ✅ Resim Önizleme Konteyneri */
export const ImagePreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

/* ✅ Resim Önizleme */
export const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 8px;
  object-fit: cover;
  border: 2px solid ${({ theme }) => theme.border};
`;

/* ✅ Dosya Yükleme Butonu */
export const FileInput = styled.input`
  display:flex;

`;

