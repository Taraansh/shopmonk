import React, { useState, createContext, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const value = { cart, setCart };

  useEffect(() => {
    let existingCartItems = localStorage.getItem("cart");
    if (existingCartItems) setCart(JSON.parse(existingCartItems));
  }, []);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartContext, CartProvider };
