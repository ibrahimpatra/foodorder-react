import { useRef, useState, useContext } from "react";

import classes from "./mealitem.module.css";
import Input from "../ui/input";
import CartContext from "../cart/cart-ctx";

const Mealitem = (props) => {
  const cartctx = useContext(CartContext);
  const [amountisvalid, setamountvalid] = useState(true);
  const amountinputref = useRef();

  

  

  const addtocarthandler = amount => {
    cartctx.additem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  const submithandler = (event) => {
    event.preventDefault();

    const enteredamount = amountinputref.current.value;
    const amountnum = +enteredamount;

    if (enteredamount.trim().length === 0 || amountnum < 1 || amountnum > 5) {
      setamountvalid(false);
      return;
    }

    addtocarthandler(amountnum);
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{props.price}</div>
      </div>
      <div>
        <form className={classes.form}  onSubmit={submithandler}>
          <Input
            ref={amountinputref}
            label="Amount"
            input={{
              id: "amount",
              type: "number",
              min: "1",
              max: "5",
              step: "1",
              defaultValue: "1",
            }}
          ></Input>
          <button>(+) Add</button>
          {!amountisvalid && <p>Enter A Valid Amount</p>}
        </form>
      </div>
    </li>
  );
};

export default Mealitem;
