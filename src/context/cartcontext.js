import { createContext, useContext, useState, useEffect } from "react";
import { getCartItems } from "../utils/cartUtils";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(getCartItems().length);
  }, []);

  const refreshCount = () => {
    setCount(getCartItems().length);
  };

  return (
    <CartContext.Provider value={{ count, refreshCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
