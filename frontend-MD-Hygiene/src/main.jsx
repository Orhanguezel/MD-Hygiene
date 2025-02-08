import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalProvider } from './context/GlobalProvider';
import { ThemeProvider } from './context/ThemeContext';  
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { UIProvider } from './context/UIContext';
import { OrdersProvider } from './context/OrdersContext';
import { NotificationProvider } from './context/NotificationContext';
import { AuditLogsProvider } from './context/AuditLogsContext';
import { InvoicesProvider } from './context/InvoicesContext';
import { OfferProvider } from './context/OfferContext'; // ✅ Buraya eklenmesi gerekiyor

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalProvider>
      <LanguageProvider>
        <ThemeProvider>
          <AuthProvider>
            <UIProvider>
              <OrdersProvider>
                <NotificationProvider>
                  <AuditLogsProvider>
                    <InvoicesProvider> {/* ✅ Buraya eklenmesi gerekiyor */}
                      <OfferProvider> {/* ✅ Buraya eklenmesi gerekiyor */}
                      <App />
                      </OfferProvider>
                    </InvoicesProvider>
                  </AuditLogsProvider>
                </NotificationProvider>
              </OrdersProvider>
            </UIProvider>
          </AuthProvider>
        </ThemeProvider>
      </LanguageProvider>
    </GlobalProvider>
  </React.StrictMode>
);
