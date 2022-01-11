import { React, Fragment, useContext, useState } from "react";

import Modal from "../ui/modal";
import classes from "./cart.module.css";
import CartContext from "../cart/cart-ctx";
import CartItem from "./CartItem";
import Checkout from "./checkout";


const Cart = (props) => {
  const [ischeckout, setcheckout] = useState(false);
  const cartctx = useContext(CartContext);
  const [submitted, setsubmitted] = useState(false);
  const [donesubmitted, setdonesubmitted] = useState(false);

  const totalamount = `$${cartctx.totalAmount.toFixed(2)}`;
  const hasitems = cartctx.items.length > 0;

  const cartitemremover = (id) => {
    cartctx.removeItem(id);
  };

  const cartitemadder = (item) => {
    cartctx.additem(item);
  };

  const orderhandle = () => {
    setcheckout(true);
  };

  const submitorder = async (userdata) => {
    setsubmitted(true);
    await fetch(
      "https://react-projects-52724-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userdata,
          ordereditems: cartctx.items,
        }),
      }
    );
    setsubmitted(false);
    setdonesubmitted(true);
    cartctx.clearcart();
  };

  return (
    <Modal onClose={props.onClose}>
      {!submitted && !donesubmitted && (
        <Fragment>
          <ul className={classes["cart-items"]}>
            {cartctx.items.map((item) => (
              <CartItem
                key={item.id}
                name={item.name}
                amount={item.amount}
                price={item.price}
                onRemove={cartitemremover.bind(null, item.id)}
                onAdd={cartitemadder.bind(null, item)}
              ></CartItem>
            ))}
          </ul>
          <div className={classes.total}>
            <span>Total - </span>
            <span>{totalamount}</span>
          </div>

          {ischeckout && (
            <Checkout onSubmit={submitorder} onCancel={props.onClose} />
          )}
          {!ischeckout && (
            <div className={classes.actions}>
              <button
                className={classes["button--alt"]}
                onClick={props.onClose}
              >
                Close
              </button>
              {hasitems && (
                <button className={classes.button} onClick={orderhandle}>
                  Order
                </button>
              )}
            </div>
          )}
        </Fragment>
      )}

      {submitted && <Fragment> <p>Sending Order Data</p> </Fragment>}
      {!submitted && donesubmitted && <Fragment> <p> Order Sent to Server Successfully.</p> </Fragment>}
    </Modal>
  );
};

export default Cart;
