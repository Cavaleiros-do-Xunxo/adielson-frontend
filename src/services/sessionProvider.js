import React, { createContext, useState } from "react";
import Cart from "../services/cart";

export const SessionContext = createContext({
  isAuthenticated: false,
  isAdmin: false,
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cartItems, setCartItems] = useState(Cart.getItems());

  return (
    <SessionContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        isAdmin,
        setIsAdmin,
        cartItems,
        setCartItems,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
