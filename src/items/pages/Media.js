import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  IoArrowBackCircle,
  IoArrowForwardCircle,
  IoCloseCircle,
} from "react-icons/io5";

import classes from "./Media.module.css";
import { IMAGE_BASE_URL } from "../../shared/utils/global-constants";
import IconOnImage from "../../shared/components/UIElements/IconOnImage";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ShareButtons from "../../shared/components/share/ShareButtons";

const Media = () => {
  const navigate = useNavigate();
  const mediaName = "uploads/images/" + useParams().mediaName;
  const itemId = useParams().itemId;
  const { sendRequest } = useHttpClient();
  const [item, setItem] = useState(null);
  const divRef = useRef();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await sendRequest(`/items/${itemId}`);
        setItem(response);
      } catch (err) {}
    };
    fetchItem();
    divRef.current.focus();
  }, [itemId, sendRequest]);

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

  const forwardClickHandler = () => {
    const currentMediaIndex = getCurrentMediaIndex();
    if (item.mediaList.length > currentMediaIndex + 1) {
      navigate(
        `/item/${itemId}/media/${
          item.mediaList[currentMediaIndex + 1].split("\\")[2]
        }`
      );
    }
  };

  const backwardClickHandler = () => {
    const currentMediaIndex = getCurrentMediaIndex();
    if (currentMediaIndex > 0) {
      navigate(
        `/item/${itemId}/media/${
          item.mediaList[currentMediaIndex - 1].split("\\")[2]
        }`
      );
    }
  };

  const getCurrentMediaIndex = () => {
    return item.mediaList.findIndex(
      (media) => media.split("\\")[2] === mediaName.split("/")[2]
    );
  };

  const keyUpHandler = (event) => {
    switch (event.code) {
      case "ArrowRight":
        forwardClickHandler();
        break;
      case "ArrowLeft":
        backwardClickHandler();
        break;
      default:
        break;
    }
  };

  return (
    <>
      {/* <Backdrop onClose={closePageHandler} /> */}
      <div
        tabIndex={1}
        className={classes.outerContainer}
        onClick={closePageHandler}
        onKeyUp={keyUpHandler}
        ref={divRef}
      >
        <div className={classes.innerContainer} onClick={closePageHandler}>
          <IconOnImage animate position="topRight">
            <IoCloseCircle size={50} onClick={closeIconHandler} color="gray" />
          </IconOnImage>

          {item && getCurrentMediaIndex() > 0 && (
            <IconOnImage animate position="left">
              <IoArrowBackCircle
                size={80}
                onClick={backwardClickHandler}
                color="gray"
              />
            </IconOnImage>
          )}

          {item && getCurrentMediaIndex() < item.mediaList.length - 1 && (
            <IconOnImage animate position="right">
              <IoArrowForwardCircle
                size={80}
                onClick={forwardClickHandler}
                color="gray"
              />
            </IconOnImage>
          )}

          {item && (
            <>
              <img
                className={classes.image}
                src={IMAGE_BASE_URL + mediaName}
                alt={mediaName}
              />

              <ShareButtons iconSize={40} />
            </>
          )}

          {!item && <p>Error</p>}
        </div>
      </div>
    </>
  );
};

export default Media;
