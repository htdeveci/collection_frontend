import classes from "./Card.module.css";

const Card = ({ className, children, onClick, animate = true }) => {
  return (
    <div
      className={`${classes.card} ${className} ${
        animate && classes.cardAnimation
      }`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
