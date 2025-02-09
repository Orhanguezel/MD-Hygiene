// 📦 src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/theme/themeSlice';
import languageReducer from '../features/language/languageSlice';
import authReducer from '../features/auth/authSlice';
import uiReducer from '../features/ui/uiSlice';
import ordersReducer from '../features/orders/ordersSlice';
import notificationReducer from '../features/notification/notificationSlice';
import auditLogsReducer from '../features/auditLogs/auditLogsSlice';
import invoicesReducer from '../features/invoices/invoicesSlice';
import offerReducer from '../features/offers/offerSlice';
import productReducer from '../features/products/productSlice';
import settingsReducer from '../features/settings/settingsSlice';
import reportsReducer from '../features/reports/reportsSlice'; // ✅ Import reportsReducer

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    language: languageReducer,
    auth: authReducer,
    ui: uiReducer,
    orders: ordersReducer,
    notification: notificationReducer,
    auditLogs: auditLogsReducer,
    invoices: invoicesReducer,
    offer: offerReducer,
    product: productReducer,
    settings: settingsReducer,
    reports: reportsReducer, // ✅ Include reportsReducer in store
  },
});
