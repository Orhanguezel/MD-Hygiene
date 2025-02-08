// ✅ ordersReducer.js
export const initialOrdersState = [];

export const ordersReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ORDER":
      return [...state, action.payload];

    case "UPDATE_ORDER":
      return state.map((order) =>
        order.id === action.payload.id ? { ...order, ...action.payload } : order
      );

    case "DELETE_ORDER":
      return state.filter((order) => order.id !== action.payload);

    default:
      return state;
  }
};
