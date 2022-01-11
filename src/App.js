import {  useState } from "react";
import Cart from "./components/cart/cart";
import CartProvider from "./components/cart/cart-context";
import Header from "./components/layout/header";
import Meals from "./components/meals/meals";

function App() {
  const [cartshow, setcartshow] = useState(false);

  const showCart = () => {
    setcartshow(true);
  };

  const hidecart = () => {
    setcartshow(false);
  };

  return (
    <CartProvider>
      {cartshow && <Cart onClose = { hidecart}></Cart>}
      <Header show = {showCart}></Header>
      <main>
        <Meals></Meals>
      </main>
    </CartProvider>
      
  );
}

export default App;
