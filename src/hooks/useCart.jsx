import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CART_KEY = 'agrilink_cart';

const getStoredCart = () => {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(getStoredCart);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((crop, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === crop.id);
      if (existing) {
        return prev.map((item) =>
          item.id === crop.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...crop, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((cropId) => {
    setCart((prev) => prev.filter((item) => item.id !== cropId));
  }, []);

  const updateQuantity = useCallback((cropId, quantity) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.id !== cropId));
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.id === cropId ? { ...item, quantity } : item
        )
      );
    }
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const total = cart.reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1), 0);
  const itemCount = cart.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    total,
    itemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    // Fallback if rendered outside provider
    const [localCart, setLocalCart] = useState(getStoredCart);
    const addToCart = (crop, quantity = 1) => {
      setLocalCart((prev) => [...prev, { ...crop, quantity }]);
    };
    return {
      cart: localCart,
      addToCart,
      removeFromCart: () => {},
      updateQuantity: () => {},
      clearCart: () => {},
      total: 0,
      itemCount: localCart.length,
    };
  }
  return context;
}
