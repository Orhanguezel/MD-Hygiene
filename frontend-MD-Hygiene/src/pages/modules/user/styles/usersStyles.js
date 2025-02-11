import styled from "styled-components";

export const UsersContainer = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.background || "#f9f9f9"};
  color: ${({ theme }) => theme.text || "#333"};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

export const AddUserButton = styled.button`
  background: #007bff;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: #0056b3;
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
  background: ${({ theme }) => theme.cardBackground || "#fff"};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
  border: 3px solid ${({ theme }) => theme.primary || "#007bff"};
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
  color: ${({ theme }) => theme.primary || "#007bff"};
  font-weight: bold;
`;

export const UserEmail = styled.p`
  margin: 0;
  color: #555;
  font-size: 0.9em;
  opacity: 0.8;
`;

export const UserRole = styled.span`
  color: #333;
  background: #e0e7ff;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.85em;
  font-weight: bold;
`;

export const UserStatus = styled.span`
  color: ${({ isActive }) => (isActive ? "#4CAF50" : "#FF5252")};
  font-weight: bold;
  font-size: 0.9em;
`;

export const ActionButton = styled.button`
  background: ${({ variant }) =>
    variant === "edit" ? "#4CAF50" : variant === "deactivate" ? "#FF5252" : "#007bff"};
  color: white;
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: ${({ variant }) =>
      variant === "edit" ? "#388E3C" : variant === "deactivate" ? "#E53935" : "#0056b3"};
    transform: translateY(-2px);
  }
`;

export const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.primary || "#007bff"};
  border-bottom: 2px solid ${({ theme }) => theme.primary || "#007bff"};
  padding-bottom: 5px;
  margin-bottom: 15px;
  text-align: center;
  font-weight: bold;
  font-size: 1.8em;
`;

export const DetailsContainer = styled.div`
  background: ${({ theme }) => theme.cardBackground || "#fff"};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  max-width: 400px;
  margin: auto;
`;

export const InfoText = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.text || "#666"};
  margin: 5px 0;
  text-align: center;
`;

export const Label = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.primary || "#007bff"};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  background: ${({ theme }) => theme.cardBackground || "#fff"};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

export const Input = styled.input`
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.border || "#ccc"};
  border-radius: 4px;
  outline: none;
  font-size: 14px;

  &:focus {
    border-color: ${({ theme }) => theme.primary || "#007bff"};
  }
`;

export const Select = styled.select`
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.border || "#ccc"};
  border-radius: 4px;
  outline: none;
  font-size: 14px;

  &:focus {
    border-color: ${({ theme }) => theme.primary || "#007bff"};
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  text-align: center;
  margin: 0;
`;
