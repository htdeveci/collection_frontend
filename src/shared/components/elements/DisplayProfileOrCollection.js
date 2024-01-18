import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Badge, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { IoPencil } from "react-icons/io5";
import Avatar from "@mui/material/Avatar";
import SlideshowRoundedIcon from "@mui/icons-material/SlideshowRounded";

import classes from "./DisplayProfileOrCollection.module.css";
import ElementOverview from "./ElementOverview";
import ImageUpload from "../FormElements/ImageUpload";
import AddElementButton from "./AddElementButton";
import { useHttpClient } from "../../hooks/http-hook";
import ElementModal from "./ElementModal";
import { NavLink } from "react-router-dom";
import ConfirmationModal from "../UIElements/ConfirmationModal";

const DisplayProfileOrCollection = ({
  type,
  id,
  data,
  setData,
  updateData,
  dataError,
}) => {
  const loggedInUserId = useSelector((state) => state.auth.userId);
  const { sendRequest: changePictureSendRequest } = useHttpClient();
  const { sendRequest: deleteElementSendRequest } = useHttpClient();
  const { sendRequest: addElementSendRequest } = useHttpClient();
  const { sendRequest: getLoggedInUserSendRequest } = useHttpClient();
  const [showModal, setShowModal] = useState(false);
  const [selectedElement, setSelectedElement] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const fetchUser = useCallback(async () => {
    const responseData = await getLoggedInUserSendRequest(
      `/users/${loggedInUserId}`
    );
    setLoggedInUser(responseData);
  }, [loggedInUserId, getLoggedInUserSendRequest]);

  useEffect(() => {
    if (loggedInUserId) {
      fetchUser();
    }
  }, [loggedInUserId, fetchUser]);

  const picturePickedHandler = async (pickedFile) => {
    try {
      const imageData = new FormData();
      imageData.append("source", File[pickedFile]);
      imageData.append("key", "6d207e02198a847aa98d0a2a901485a5");

      /*  const body = JSON.stringify({
        key: "6d207e02198a847aa98d0a2a901485a5",
        source: File[pickedFile],
      }); */

      const headers = { "Content-Type": "multipart/form-data" };
      const method = "POST";

      const response = await fetch("https://freeimage.host/api/1/upload", {
        method,
        imageData,
        // body,
        headers,
      });

      const responseData = await response.json();

      console.log(responseData);
    } catch (err) {
      console.log("errorr happens");
    }
  };

  /* 
  
  ************This piece of code was the original one.**************

  const picturePickedHandler = async (pickedFile) => {
    try {
      const imageData = new FormData();
      imageData.append("image", pickedFile);
      const responseData = await changePictureSendRequest(
        `/${
          type === "profile"
            ? "users/changePicture"
            : "collections/changeCoverPicture"
        }/${id}`,
        "PATCH",
        imageData,
        true
      );
      setData((state) => {
        if (type === "profile")
          return { ...state, profilePicture: responseData.profilePicture };
        else return { ...state, coverPicture: responseData.coverPicture };
      });
    } catch (err) {}
  };
 */
  const openModalHandler = (element = null) => {
    setSelectedElement(element);
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  const submitModalHandler = async (body) => {
    let url;
    if (type === "profile") {
      url = selectedElement
        ? `/collections/${selectedElement.id}`
        : "/collections";
    } else if (type === "collection") {
      url = selectedElement ? `/items/${selectedElement.id}` : "/items";
    }

    const method = selectedElement ? "PATCH" : "POST";

    try {
      await addElementSendRequest(url, method, body, true);
    } catch (err) {
      console.log(err);
    }
    setShowModal(false);
    updateData();
  };

  const deleteElementHandler = (element) => {
    setSelectedElement(element);
    setShowConfirmationDialog(true);
  };

  const deleteElement = async () => {
    try {
      await deleteElementSendRequest(
        `/${type === "profile" ? "collections" : "items"}/${
          selectedElement.id
        }`,
        "DELETE",
        null,
        true
      );
      updateData();
    } catch (err) {
      console.log(err);
    }
    setShowConfirmationDialog(false);
  };

  const isUserAuthorized = () => {
    if (type === "profile") return id === loggedInUserId;
    else return data.creator.id === loggedInUserId;
  };

  const getBadgeContent = () => {
    if (isUserAuthorized()) {
      return <ImageUpload Icon={IoPencil} onPicked={picturePickedHandler} />;
    }
    return null;
  };

  const selectedElementVisibilityChangeHandler = (value) => {
    if (selectedElement) {
      setSelectedElement((state) => {
        return { ...state, visibility: value };
      });
    }
  };

  return (
    <>
      {data && (
        <>
          <header className={classes.header}>
            <Box flex={1} alignSelf="center" textAlign="left">
              <Badge
                showZero={true}
                badgeContent={getBadgeContent()}
                color="primary"
                overlap="circular"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                className={classes.badge}
              >
                <Avatar
                  src={process.env.REACT_APP_ASSET_URL.concat(
                    type === "profile"
                      ? data.profilePicture
                        ? data.profilePicture
                        : null
                      : data.coverPicture
                      ? data.coverPicture
                      : null
                  )}
                  alt={type === "profile" ? "profile" : "cover"}
                  sx={{ width: 200, height: 200 }}
                />
              </Badge>
            </Box>

            <Box
              flex={3}
              sx={{
                paddingTop: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                // justifyContent: "space-between",
              }}
            >
              <Typography variant="h2" color="white">
                {type === "profile" ? data.username : data.name}
              </Typography>

              {type === "collection" && (
                <Stack textAlign="center" spacing={3}>
                  <>
                    <Typography variant="subtitle1" color="text.primary">
                      {data.description}
                    </Typography>

                    <Stack>
                      <Typography variant="caption" color="text.primary">
                        created by
                      </Typography>

                      <Typography
                        variant="p"
                        component={NavLink}
                        to={`/profile/${data.creator.id}`}
                        color="secondary"
                        sx={{ textDecoration: "none" }}
                      >
                        {data.creator.username}
                      </Typography>
                    </Stack>
                  </>
                </Stack>
              )}
            </Box>

            {type === "collection" && (
              <Box alignSelf="center">
                <Tooltip title="Start Slide Show">
                  <IconButton size="large" color="primary">
                    <SlideshowRoundedIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </header>

          <section className={classes.collectionOverviewSection}>
            {isUserAuthorized() && (
              <AddElementButton
                buttonName={type === "profile" ? "Add Collection" : "Add Item"}
                onClick={openModalHandler.bind(null, null)}
              />
            )}

            {(type === "profile" ? data.collectionList : data.itemList).map(
              (element) => {
                return (
                  <ElementOverview
                    key={element.id}
                    type={type === "profile" ? "collection" : "item"}
                    id={element.id}
                    elementName={element.name}
                    elementDescription={element.description}
                    coverPicture={
                      type === "profile"
                        ? element.coverPicture
                        : element.mediaList[0]
                    }
                    showEditActions={isUserAuthorized()}
                    editHandler={openModalHandler.bind(null, element)}
                    deleteHandler={deleteElementHandler.bind(null, element)}
                    showFavoriteActions={!!loggedInUserId}
                    favoriteStatus={
                      loggedInUser &&
                      (type === "profile"
                        ? loggedInUser.favoriteCollectionList
                        : loggedInUser.favoriteItemList
                      ).filter((e) => e.id === element.id).length > 0
                    }
                    favoriteCount={element.favoriteByUserList.length}
                    isElementHidden={element.visibility === "self"}
                  />
                );
              }
            )}

            <ConfirmationModal
              show={showConfirmationDialog}
              onCancel={() => setShowConfirmationDialog(false)}
              message={`Do you realy want to delete this ${
                type === "profile" ? "collection" : "item"
              }?`}
              onSubmit={deleteElement}
            />
          </section>

          <ElementModal
            type={type === "profile" ? "collection" : "item"}
            showModal={showModal}
            closeModalHandler={closeModalHandler}
            submitHandler={submitModalHandler}
            selectedElement={selectedElement}
            elementId={id}
            onVisibilityChange={selectedElementVisibilityChangeHandler}
          />
        </>
      )}
      {dataError && <p>User not found!</p>}
    </>
  );
};

export default DisplayProfileOrCollection;
