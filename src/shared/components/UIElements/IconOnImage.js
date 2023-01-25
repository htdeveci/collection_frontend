import classes from "./IconOnImage.module.css";

const IconOnImage = ({
  children,
  position,
  showBackgroud = false,
  animate = false,
}) => {
  let positionStyle;

  switch (position) {
    case "topLeft":
      positionStyle = classes.positionTopLeft;
      break;
    case "topRight":
      positionStyle = classes.positionTopRight;
      break;
    case "left":
      positionStyle = classes.positionLeft;
      break;
    case "right":
      positionStyle = classes.positionRight;
      break;
    case "bottomRight":
      positionStyle = classes.positionBottomRight;
      break;
    default:
      positionStyle = classes.positionTopRight;
      break;
  }

  return (
    <div
      className={`${classes.icon} ${positionStyle} ${
        animate && classes.iconAnimation
      } ${showBackgroud && classes.background}`}
    >
      {children}
    </div>
  );
};

export default IconOnImage;
