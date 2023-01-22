import { useNavigate, useParams } from "react-router-dom";
import { IoCloseCircle } from "react-icons/io5";

import classes from "./Media.module.css";
import Backdrop from "../../shared/components/UIElements/Backdrop";
import { IMAGE_BASE_URL } from "../../shared/utils/global-constants";
import IconOnImage from "../../shared/components/UIElements/IconOnImage";

const Media = () => {
  const navigate = useNavigate();
  const mediaName = "uploads/images/" + useParams().mediaName;
  const itemId = useParams().itemId;

  const closePageHandler = (event) => {
    if (event.target.tagName === "DIV") {
      closePage();
    }
  };

  const closeIconHandler = () => {
    closePage();
  };

  const closePage = () => {
    navigate(`/item/${itemId}`);
  };

  return (
    <>
      <Backdrop onClose={closePageHandler} />
      <div className={classes.outerContainer} onClick={closePageHandler}>
        <div className={classes.innerContainer} onClick={closePageHandler}>
          <IconOnImage animate>
            <IoCloseCircle size={50} onClick={closeIconHandler} color="gray" />
          </IconOnImage>
          <img
            className={classes.image}
            src={IMAGE_BASE_URL + mediaName}
            alt={mediaName}
          />
        </div>
      </div>
    </>
  );
};

export default Media;
