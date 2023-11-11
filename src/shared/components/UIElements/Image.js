import classes from "./Image.module.css";

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
        src={process.env.REACT_APP_ASSET_URL + props.src}
        alt={props.alt}
        style={{ objectFit: props.objectFit }}
      />
    </div>
  );
};

export default Image;
