import { Fragment } from "react/cjs/react.development";
import classes from "./modal.module.css";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} ></div>;
};

const Modaloverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const overlay =  document.getElementById('overlays');

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose}/>,overlay
      )}
      {ReactDOM.createPortal(<Modaloverlay>{props.children}</Modaloverlay>, overlay)}
    </Fragment>
  );
};

export default Modal;
