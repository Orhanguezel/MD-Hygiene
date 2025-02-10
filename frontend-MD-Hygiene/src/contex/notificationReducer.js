// ✅ notificationReducer.js
export const initialNotificationState = [];

export const notificationReducer = (state, action) => {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      return [action.payload, ...state];

    case "MARK_AS_READ":
      return state.map((notification) =>
        notification.id === action.payload
          ? { ...notification, status: "read" }
          : notification
      );

    case "DELETE_NOTIFICATION":
      return state.filter((notification) => notification.id !== action.payload);

    default:
      return state;
  }
};
