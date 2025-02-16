export const BackButton = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #495057;
    transform: scale(1.02);
  }
`;

export const SettingsContainer = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => (theme === "dark" ? "#1e1e1e" : "#f9f9f9")};
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
  max-width: 800px;
  margin: 0 auto;
  border-radius: 10px;
`;

export const Section = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 8px;
  background-color: ${({ theme }) => (theme === "dark" ? "#333" : "#fff")};
  box-shadow: ${({ theme }) =>
    theme === "dark" ? "0px 0px 10px rgba(255, 255, 255, 0.1)" : "0px 0px 10px rgba(0, 0, 0, 0.1)"};
`;