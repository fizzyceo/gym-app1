import React, { createContext, useReducer } from 'react';
export const Store = createContext();
const InitState = {
  CurrentUser: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'Log_in':
      return { ...state, CurrentUser: action.user };
    case 'Get_User':
      return { CurrentUser };
    case 'Log_Out':
      return { ...state, CurrentUser: {} };
    default:
      return state;
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, InitState);

  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
};
