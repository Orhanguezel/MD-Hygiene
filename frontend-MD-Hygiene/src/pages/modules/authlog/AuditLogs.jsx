import { AuditLogsContainer, LogsTable, Th, Td, StatusBadge } from "./styles/auditLogsStyles";
import { useLanguage } from "@/context/LanguageContext";
import { useAuditLogs } from "@/context/AuditLogsContext";

const AuditLogs = () => {
  const { texts } = useLanguage();
  const { logs } = useAuditLogs();

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
          {logs.map((log) => (
            <tr key={log.id}>
              <Td>{log.eventType || "Olay Yok"}</Td>  {/* ✅ eventType gösteriliyor */}
              <Td>{log.user || "Bilinmiyor"}</Td>     {/* ✅ user gösteriliyor */}
              <Td>{log.date || "Tarih Yok"}</Td>      {/* ✅ date gösteriliyor */}
              <Td>
                <StatusBadge $status={log.status || "Bilinmiyor"}>
                  {log.status || "Bilinmiyor"}
                </StatusBadge>
              </Td>
            </tr>
          ))}
        </tbody>
      </LogsTable>
    </AuditLogsContainer>
  );
};

export default AuditLogs;
