import { useRef, useState } from "react";
import classes from "./checkout.module.css";

const isempty = (value) => value.trim() === "";
const six = (value) => value.trim().length !== 6;
const ten = (value) => value.trim().length !== 10;

const Checkout = (props) => {
  const [forminpvalid, setforminputvalid] = useState({
    name: true,
    mobile: true,
    street: true,
    postal: true,
    city: true,
  });
  const nameinputref = useRef();
  const mobileinputref = useRef();
  const streetinputref = useRef();
  const postalinputref = useRef();
  const cityinputref = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredname = nameinputref.current.value;
    const enterednumber = mobileinputref.current.value;
    const enteredstreet = streetinputref.current.value;
    const enteredpostal = postalinputref.current.value;
    const enteredcity = cityinputref.current.value;

    const namevalid = !isempty(enteredname);
    const mobvalid = !ten(enterednumber);
    const streetvalid = !isempty(enteredstreet);
    const postalvalid = !six(enteredpostal);
    const cityvalid = !isempty(enteredcity);

    setforminputvalid({
      name: namevalid,
      mobile: mobvalid,
      street: streetvalid,
      postal: postalvalid,
      city: cityvalid,
    });

    const formvalid =
      namevalid && mobvalid && streetvalid && postalvalid && cityvalid;

    if (!formvalid) {
      return;
    }

    props.onSubmit({
      name: enteredname,
      mobile: enterednumber,
      street: enteredstreet,
      postal: enteredpostal,
      city: enteredcity

    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameinputref} />
        {!forminpvalid.name && <p>Enter A Valid Name</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="mobile">Mobile Number</label>
        <input type="number" id="mobile" ref={mobileinputref} />
        {!forminpvalid.mobile && <p>Enter A Valid mobile</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetinputref} />
        {!forminpvalid.street && <p>Enter A Valid street</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalinputref} />
        {!forminpvalid.postal && <p>Enter A Valid postal</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityinputref} />
        {!forminpvalid.city && <p>Enter A Valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
