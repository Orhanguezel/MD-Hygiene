export const initialOfferState = [];

export const offerReducer = (state, action) => {
  switch (action.type) {
    case "SET_OFFERS":
      return action.payload;
    case "ADD_OFFER":
      return [...state, action.payload];
    case "UPDATE_OFFER":
      return state.map((offer) =>
        offer.id === action.payload.id ? { ...offer, ...action.payload } : offer
      );
    case "DELETE_OFFER":
      return state.filter((offer) => offer.id !== action.payload);
    case "CHANGE_STATUS":
      return state.map((offer) =>
        offer.id === action.payload.id
          ? { ...offer, status: action.payload.status }
          : offer
      );
    default:
      return state;
  }
};
