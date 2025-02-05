import { useEffect, useState } from "react";
import styled from "styled-components";

const MailContainer = styled.div`
  padding: 20px;
`;

const MailTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHeader = styled.th`
  background-color: #1f2937;
  color: white;
  padding: 10px;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

const TableCell = styled.td`
  padding: 10px;
  text-align: center;
`;

const AdminMail = () => {
  const [mails, setMails] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5010/api/mail")
      .then((res) => res.json())
      .then((data) => setMails(data))
      .catch((err) => console.error("Mailleri alırken hata:", err));
  }, []);

  return (
    <MailContainer>
      <h1>Admin - Gelen Kutusu</h1>
      <MailTable>
        <thead>
          <tr>
            <TableHeader>ID</TableHeader>
            <TableHeader>Gönderen</TableHeader>
            <TableHeader>Konu</TableHeader>
            <TableHeader>Mesaj</TableHeader>
          </tr>
        </thead>
        <tbody>
          {mails.map((mail) => (
            <TableRow key={mail._id}>
              <TableCell>{mail._id}</TableCell>
              <TableCell>{mail.sender}</TableCell>
              <TableCell>{mail.subject}</TableCell>
              <TableCell>{mail.message}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </MailTable>
    </MailContainer>
  );
};

export default AdminMail;
