import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import classes from "./Modal.module.css";
import Backdrop from "./Backdrop";

const ModalOverlay = (props) => {
  const content = (
    <div className={`${classes.modal} ${props.className}`} style={props.style}>
      <header
        className={`${classes.modal__header} ${props.headerClass}`}
        style={props.headerStyle}
      >
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={`${classes.modal__content} ${props.contentClass}`}>
          {props.children}
        </div>
        <footer
          className={`${classes.modal__footer} ${props.footerClass}`}
          style={props.footerStyle}
        >
          {props.footer}
        </footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
  return (
    <>
      {props.show && <Backdrop onClose={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames={classes}
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </>
  );
};

export default Modal;
