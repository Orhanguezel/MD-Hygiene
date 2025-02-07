import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { UIProvider } from "./context/UIContext";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { AuditLogsProvider } from "./context/AuditLogsContext";
import { NotificationProvider } from "./context/NotificationContext";
import { OrdersProvider } from "./context/OrdersContext";
import 'leaflet/dist/leaflet.css';


createRoot(document.getElementById('root')).render(
  <UIProvider>
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <AuditLogsProvider>
            <NotificationProvider>
              <OrdersProvider>
                <App />
              </OrdersProvider>
            </NotificationProvider>
          </AuditLogsProvider>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  </UIProvider>
);
