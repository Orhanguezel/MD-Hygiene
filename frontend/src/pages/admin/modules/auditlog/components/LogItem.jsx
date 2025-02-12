import { LogItemContainer, StatusBadge } from "../styles/auditLogsStyles";
import { useLanguage } from "@/features/language/useLanguage";  // ✅ RTK Dil Yönetimi
import { useTheme } from "@/features/theme/useTheme";           // ✅ RTK Tema Yönetimi

const LogItem = ({ log }) => {
  const { texts } = useLanguage();  // ✅ Dil desteği
  const { theme } = useTheme();     // ✅ Tema desteği

  return (
    <LogItemContainer theme={theme}>
      <p>
        <strong>{texts?.auditLogs?.eventType || "Olay Türü"}:</strong> {log.eventType || "-"}
      </p>
      <p>
        <strong>{texts?.auditLogs?.user || "Kullanıcı"}:</strong> {log.user || "-"}
      </p>
      <p>
        <strong>{texts?.auditLogs?.date || "Tarih"}:</strong> {log.date || "-"}
      </p>
      <StatusBadge theme={theme} $status={log.status || "Bilinmiyor"}>
        {log.status || texts?.auditLogs?.unknown || "Bilinmiyor"}
      </StatusBadge>
    </LogItemContainer>
  );
};

export default LogItem;
