import classes from "./Button.module.css";

const Button = (props) => {
  let children = props.children;
  if (typeof children === "string" || children instanceof String)
    children = children.toUpperCase();

  return (
    <button
      className={`${classes.button} ${props.small && classes.buttonSmall} ${
        props.big && classes.buttonBig
      } ${props.inverse && classes.buttonInverse}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {children}
    </button>
  );
};

export default Button;
