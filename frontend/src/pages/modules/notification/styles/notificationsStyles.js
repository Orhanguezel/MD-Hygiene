import styled from "styled-components";

export const NotificationsContainer = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  min-height: 100vh;
`;

export const NotificationsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const NotificationItem = styled.li`
  background: ${({ theme }) => theme.cardBackground || "#fff"};
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NotificationText = styled.div`
  flex: 1;
`;

export const StatusBadge = styled.span`
  background-color: ${({ status }) =>
    status === "Okundu" ? "#4CAF50" : "#FF9800"};
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.85rem;
`;

export const ActionButton = styled.button`
  background: ${({ theme }) => theme.buttonBackground || "#4CAF50"};
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: ${({ theme }) => theme.buttonHover || "#45a049"};
  }
`;
