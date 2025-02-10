import { authReducer } from "./authReducer";
import { themeReducer } from "./themeReducer";
import { languageReducer } from "./languageReducer";
import { notificationReducer } from "./notificationReducer";
import { ordersReducer } from "./orderReducer";
import { uiReducer } from "./uiReducer";
import { auditLogsReducer } from "./auditLogsReducer";


export const rootReducer = (state, action) => ({
  auth: authReducer(state.auth, action),
  theme: themeReducer(state.theme, action),
  language: languageReducer(state.language, action),
  notifications: notificationReducer(state.notifications, action),
  orders: ordersReducer(state.orders, action),
  ui: uiReducer(state.ui, action),
  auditLogs: auditLogsReducer(state.auditLogs, action),
});

export const initialState = {
  auth: { user: null, token: null, loading: true },
  theme: localStorage.getItem("theme") || "light",
  language: localStorage.getItem("language") || "tr",
  notifications: [],
  orders: [],
  ui: { sidebarOpen: true, modalOpen: false, loading: false },
  auditLogs: [],

};
