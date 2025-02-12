import { AuditLogsContainer, LogsTable, Th, Td, StatusBadge } from "./styles/auditLogsStyles";
import { useLanguage } from "@/features/language/useLanguage";  // ✅ RTK Dil Yönetimi
import { useTheme } from "@/features/theme/useTheme";           // ✅ RTK Tema Yönetimi
import { useAuditLogs } from "@/features/auditLogs/useAuditLogs"; // ✅ RTK Audit Logs Yönetimi

const AuditLogs = () => {
  const { texts } = useLanguage();
  const { theme } = useTheme();
  const { logs } = useAuditLogs();

  return (
    <AuditLogsContainer theme={theme}>
      <h1>{texts?.auditLogs?.title || "Denetim Kayıtları"}</h1>

      <LogsTable theme={theme}>
        <thead>
          <tr>
            <Th theme={theme}>{texts?.auditLogs?.eventType || "Olay Türü"}</Th>
            <Th theme={theme}>{texts?.auditLogs?.user || "Kullanıcı"}</Th>
            <Th theme={theme}>{texts?.auditLogs?.date || "Tarih"}</Th>
            <Th theme={theme}>{texts?.auditLogs?.status || "Durum"}</Th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <Td theme={theme}>{log.eventType || "Olay Yok"}</Td>
              <Td theme={theme}>{log.user || "Bilinmiyor"}</Td>
              <Td theme={theme}>{log.date || "Tarih Yok"}</Td>
              <Td theme={theme}>
                <StatusBadge theme={theme} $status={log.status || "Bilinmiyor"}>
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
