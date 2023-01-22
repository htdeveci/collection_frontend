import classes from "./Button.module.css";

const Button = ({
  children,
  type = "button",
  onClick,
  disabled,
  small,
  big,
  inverse,
  width,
}) => {
  let childrenUpperCase = children;
  if (
    typeof childrenUpperCase === "string" ||
    childrenUpperCase instanceof String
  )
    childrenUpperCase = childrenUpperCase.toUpperCase();

  return (
    <button
      className={`${classes.button} ${small && classes.buttonSmall} ${
        big && classes.buttonBig
      } ${inverse && classes.buttonInverse}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{ width: width }}
    >
      {childrenUpperCase}
    </button>
  );
};

export default Button;
