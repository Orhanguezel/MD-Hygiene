// ✅ auditLogsReducer.js
export const auditLogsReducer = (state, action) => {
  switch (action.type) {
    case "ADD_LOG":
      return [action.payload, ...state];
    case "CLEAR_LOGS":
      return [];
    default:
      return state;
  }
};