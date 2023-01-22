import classes from "./IconOnImage.module.css";

const IconOnImage = ({ children, animate = false }) => {
  return (
    <div className={`${classes.icon} ${animate && classes.iconAnimation}`}>
      {children}
    </div>
  );
};

export default IconOnImage;
