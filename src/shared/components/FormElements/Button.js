import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      className={`${classes.button} ${props.small && classes.buttonSmall} ${
        props.big && classes.buttonBig
      } ${props.inverse && classes.buttonInverse}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
