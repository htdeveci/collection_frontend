import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import classes from "./Media.module.css";
import Backdrop from "../../shared/components/UIElements/Backdrop";
import Image from "../../shared/components/UIElements/Image";
import { IMAGE_BASE_URL } from "../../shared/utils/global-constants";

const Media = () => {
  const navigate = useNavigate();
  const mediaName = "uploads/images/" + useParams().mediaName;
  const itemId = useParams().itemId;
  const [closePage, setClosePage] = useState(true);

  const closePageHandler = (event) => {
    if (event.target.tagName === "DIV") navigate(`/item/${itemId}`);
    console.log(event.target.tagName);
  };

  return (
    <>
      <Backdrop onClose={closePageHandler} />
      <div className={classes.container} onClick={closePageHandler}>
        <img
          className={classes.image}
          src={IMAGE_BASE_URL + mediaName}
          alt={mediaName}
        />
      </div>
    </>
  );
};

export default Media;
