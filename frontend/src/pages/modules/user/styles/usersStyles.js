import styled from "styled-components";

export const UsersContainer = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

export const AddUserButton = styled.button`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.buttonText};
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
    transform: translateY(-3px);
  }
`;

export const ResponsiveGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  width: 100%;
`;

export const UserCard = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  box-shadow: 0 4px 12px ${({ theme }) => theme.shadow};
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;
  cursor: pointer;
  width: 280px;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const UserImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${({ theme }) => theme.primary};
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-align: center;
`;

export const UserName = styled.h3`
  margin: 0;
  font-size: 1.4em;
  color: ${({ theme }) => theme.primary};
  font-weight: bold;
`;

export const UserEmail = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.text};
  font-size: 0.9em;
  opacity: 0.8;
`;

export const UserRole = styled.span`
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.border};
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.85em;
  font-weight: bold;
`;

export const UserStatus = styled.span`
  color: ${({ $isActive, theme }) => ($isActive ? theme.success : theme.error)};
  font-weight: bold;
  font-size: 0.9em;
`;

export const ActionButton = styled.button`
  background: ${({ variant, theme }) =>
    variant === "edit" ? theme.success :
    variant === "deactivate" ? theme.error :
    theme.primary};
  color: ${({ theme }) => theme.buttonText};
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: ${({ variant, theme }) =>
      variant === "edit" ? theme.successHover :
      variant === "deactivate" ? theme.errorHover :
      theme.primaryHover};
    transform: translateY(-2px);
  }
`;

export const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.primary};
  border-bottom: 2px solid ${({ theme }) => theme.primary};
  padding-bottom: 5px;
  margin-bottom: 15px;
  text-align: center;
  font-weight: bold;
  font-size: 1.8em;
`;

export const DetailsContainer = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px ${({ theme }) => theme.shadow};
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  max-width: 400px;
  margin: auto;
`;

export const InfoText = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.text};
  margin: 5px 0;
  text-align: center;
`;

export const Label = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  background: ${({ theme }) => theme.cardBackground};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px ${({ theme }) => theme.shadow};
  width: 100%;
  max-width: 400px;
`;

export const Input = styled.input`
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  outline: none;
  font-size: 14px;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputText};

  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

export const Select = styled.select`
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  outline: none;
  font-size: 14px;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputText};

  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.error};
  font-size: 14px;
  text-align: center;
  margin: 0;
`;

// ✅ Resim Önizleme Stili
export const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin: 10px auto;
  border: 2px solid ${({ theme }) => theme.success};
`;

export const FavoritesList = styled.div`
  margin-top: 20px;
  padding: 10px;
  border-top: 2px solid ${({ theme }) => theme.border};

  h3 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: ${({ theme }) => theme.primary};
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    background: ${({ theme }) => theme.cardBackground};
    padding: 8px;
    margin: 5px 0;
    border-radius: 5px;
    color: ${({ theme }) => theme.text};
  }
`;
