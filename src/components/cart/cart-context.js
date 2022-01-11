import React from "react";
import { useReducer } from "react";
import { act } from "react-dom/test-utils";

import CartContext from "./cart-ctx";

const defaultcartstate = {
  items: [],
  totalAmount: 0,
};

const cartreducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedamt =
      state.totalAmount + action.item.price * action.item.amount;
    const existingindex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existing = state.items[existingindex];
    let updateditms;
    if (existing) {
      const updateditm = {
        ...existing,
        amount: existing.amount + action.item.amount,
      };
      updateditms = [...state.items];
      updateditms[existingindex] = updateditm;
    } else {
      updateditms = state.items.concat(action.item);
    }
    return {
      items: updateditms,
      totalAmount: updatedamt,
    };
  }

  if (action.type === "REMOVE") {
    const existingindex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existing = state.items[existingindex];
    const updatedamt = state.totalAmount - existing.price;
    let updateditms;
    if (existing.amount === 1) {
      updateditms = state.items.filter((item) => item.id !== action.id);
    } else {
      const updateditm = { ...existing, amount: existing.amount - 1 };
      updateditms = [...state.items];
      updateditms[existingindex] = updateditm;
    }

    return {
      items: updateditms,
      totalAmount: updatedamt,
    };
  }

  if (action.type === "CLEAR") {
    return defaultcartstate;
  }

  return defaultcartstate;
};

const CartProvider = (props) => {
  const [cartstate, cartaction] = useReducer(cartreducer, defaultcartstate);

  const additemHandle = (item) => {
    cartaction({ type: "ADD", item: item });
  };

  const removeitemHandle = (item) => {
    cartaction({ type: "REMOVE", item: item });
  };

  const clearcarthandle = (item) => {
    cartaction({ type: "CLEAR", item: item });
  };

  const cartContext = {
    items: cartstate.items,
    totalAmount: cartstate.totalAmount,
    additem: additemHandle,
    removeItem: removeitemHandle,
    clearcart: clearcarthandle,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
