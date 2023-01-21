import classes from "./Image.module.css";
import { IMAGE_BASE_URL } from "../../utils/global-constants";

const Image = (props) => {
  const style = {
    width: props.width,
    height: props.height,
    borderRadius: props.borderRadius + "%",
  };

  return (
    <div
      className={classes.imageFrame + " " + props.className}
      onClick={props.onClick}
      style={style}
    >
      <img
        className={classes.image}
        src={IMAGE_BASE_URL + props.src}
        alt={props.alt}
        style={{ objectFit: props.objectFit }}
      />
    </div>
  );
};

export default Image;
