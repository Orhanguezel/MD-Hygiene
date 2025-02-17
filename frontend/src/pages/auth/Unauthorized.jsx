import { useLanguage } from "@/features/language/useLanguage";
import { useTheme } from "@/features/theme/useTheme";

const Unauthorized = () => {
  const { texts } = useLanguage();
  const { theme } = useTheme();

  return (
    <div style={{ textAlign: "center", padding: "50px", color: theme.text, background: theme.background }}>
      <h2>🚫 {texts?.auth?.unauthorizedTitle || "Yetkisiz Erişim"}</h2>
      <p>{texts?.auth?.unauthorizedMessage || "Bu sayfaya erişim yetkiniz bulunmamaktadır."}</p>
    </div>
  );
};

export default Unauthorized;
