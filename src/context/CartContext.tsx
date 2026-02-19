"use client";

import React, { createContext, useContext, useReducer, useCallback, useMemo } from "react";
import { CartItem, Product } from "@/types";

// Action types
type CartAction =
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" };

// State type
interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

// Context type
interface CartContextType extends CartState {
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (id: number) => number;
}

// Calculate totals helper
function calculateTotals(items: CartItem[]) {
  return {
    totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  };
}

// Reducer
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      let newItems: CartItem[];
      if (existingItem) {
        newItems = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }
      return { items: newItems, ...calculateTotals(newItems) };
    }
    case "REMOVE_FROM_CART": {
      const newItems = state.items.filter(
        (item) => item.id !== action.payload
      );
      return { items: newItems, ...calculateTotals(newItems) };
    }
    case "UPDATE_QUANTITY": {
      if (action.payload.quantity <= 0) {
        const newItems = state.items.filter(
          (item) => item.id !== action.payload.id
        );
        return { items: newItems, ...calculateTotals(newItems) };
      }
      const newItems = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return { items: newItems, ...calculateTotals(newItems) };
    }
    case "CLEAR_CART":
      return { items: [], totalItems: 0, totalPrice: 0 };
    default:
      return state;
  }
}

// Initial state
const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

// Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = useCallback((product: Product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  }, []);

  const removeFromCart = useCallback((id: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  }, []);

  const updateQuantity = useCallback((id: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const getItemQuantity = useCallback(
    (id: number) => {
      const item = state.items.find((item) => item.id === id);
      return item ? item.quantity : 0;
    },
    [state.items]
  );

  const value = useMemo(
    () => ({
      ...state,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getItemQuantity,
    }),
    [state, addToCart, removeFromCart, updateQuantity, clearCart, getItemQuantity]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Hook
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart harus digunakan di dalam CartProvider");
  }
  return context;
}
