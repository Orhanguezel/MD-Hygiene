import { AuditLogsContainer, LogsTable, Th, Td, StatusBadge } from "../../styles/auditLogsStyles";
import { useLanguage } from "../../context/LanguageContext";

const AuditLogs = () => {
  const { texts } = useLanguage();

  const dummyLogs = [
    { id: 1, eventType: "Giriş", user: "Orhan Admin", date: "2024-04-01", status: "Bilgi" },
    { id: 2, eventType: "Veri Güncelleme", user: "Ali Veli", date: "2024-04-02", status: "Uyarı" },
    { id: 3, eventType: "Silme İşlemi", user: "Ayşe Yılmaz", date: "2024-04-03", status: "Hata" },
  ];

  return (
    <AuditLogsContainer>
      <h1>{texts.auditLogs.title}</h1>
      <LogsTable>
        <thead>
          <tr>
            <Th>{texts.auditLogs.eventType}</Th>
            <Th>{texts.auditLogs.user}</Th>
            <Th>{texts.auditLogs.date}</Th>
            <Th>{texts.auditLogs.status}</Th>
          </tr>
        </thead>
        <tbody>
          {dummyLogs.map((log) => (
            <tr key={log.id}>
              <Td>{log.eventType}</Td>
              <Td>{log.user}</Td>
              <Td>{log.date}</Td>
              <Td>
                <StatusBadge status={log.status}>{log.status}</StatusBadge>
              </Td>
            </tr>
          ))}
        </tbody>
      </LogsTable>
    </AuditLogsContainer>
  );
};

export default AuditLogs;
