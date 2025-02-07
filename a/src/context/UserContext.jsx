import { createContext, useReducer } from "react";
import { appReducer, initialState } from "./AppReducer";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const signin = (userData) => {
    dispatch({ type: "SET_USER", payload: userData });
  };

  const signout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <UserContext.Provider value={{ user: state.user, signin, signout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
