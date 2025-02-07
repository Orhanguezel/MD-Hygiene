import { LogItemContainer, StatusBadge } from "../styles/auditLogsStyles";

const LogItem = ({ log }) => {
  return (
    <LogItemContainer>
      <p><strong>Olay Türü:</strong> {log.eventType}</p>
      <p><strong>Kullanıcı:</strong> {log.user}</p>
      <p><strong>Tarih:</strong> {log.date}</p>
      <StatusBadge $status={log.status}>{log.status}</StatusBadge>
    </LogItemContainer>
  );
};

export default LogItem;
