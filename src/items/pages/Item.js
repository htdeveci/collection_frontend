import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import classes from "./Item.module.css";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import { IoTrash, IoMove } from "react-icons/io5";
import IconOnImage from "../../shared/components/UIElements/IconOnImage";
import ShareButtons from "../../shared/components/share/ShareButtons";
import ConfirmationModal from "../../shared/components/UIElements/ConfirmationModal";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

const Item = () => {
  const loggedInUserId = useSelector((state) => state.auth.userId);
  // const token = useSelector((state) => state.auth.token);
  const itemId = useParams().itemId;
  const {
    sendRequest: fetchItemSendRequest,
    error: fetchItemError,
    clearError: fetchItemClearError,
  } = useHttpClient();
  const { sendRequest: addMediaSendRequest } = useHttpClient();
  const { sendRequest: deleteMediaSendRequest } = useHttpClient();
  const [loadedItem, setLoadedItem] = useState(null);
  const [mediaEditable, setMediaEditable] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedMediaName, setSelectedMediaName] = useState(null);
  const [mediaDraggable, setMediaDraggable] = useState(false);
  const theme = useTheme();

  const fetchItem = useCallback(async () => {
    try {
      const responseData = await fetchItemSendRequest(`/items/${itemId}`);
      if (responseData) fetchItemClearError();
      setLoadedItem(responseData);
    } catch (err) {
      setLoadedItem(null);
      console.log(err);
    }
  }, [fetchItemSendRequest, itemId, fetchItemClearError]);

  useEffect(() => {
    fetchItem();
  }, [fetchItem]);

  useEffect(() => {
    if (loadedItem)
      setMediaEditable((state) => state && loadedItem.mediaList.length > 1);
  }, [loadedItem]);

  const newMediaPickedHandler = async (pickedMedia) => {
    const body = new FormData();
    body.append("image", pickedMedia);
    try {
      await addMediaSendRequest(
        `/items/addMedia/${itemId}`,
        "PATCH",
        body,
        true
      );
      fetchItem();
    } catch (err) {
      console.log(err);
    }
  };

  const toggleEditMediaHandler = () => {
    setMediaEditable((state) => !state);
  };

  const getMediaLink = (imageLink) => {
    return mediaEditable
      ? ""
      : `/item/${itemId}/media/${imageLink.split("\\")[2]}`;
  };

  const deleteMediaHandler = async (media) => {
    setSelectedMediaName(media);
    setShowConfirmationModal(true);
  };

  const deleteMedia = async (event) => {
    event.preventDefault();
    try {
      await deleteMediaSendRequest(
        `/items/${itemId}/media/${selectedMediaName.split("\\")[2]}`,
        "DELETE",
        null,
        true
      );
      fetchItem();
    } catch (err) {
      console.log(err);
    }
    setSelectedMediaName(null);
    setShowConfirmationModal(false);
  };

  const cancelDeleteMediaHandler = () => {
    setSelectedMediaName(null);
    setShowConfirmationModal(false);
  };

  const MediaCard = ({ cardClass, media, height }) => {
    return (
      <Card className={cardClass}>
        <CardActionArea
          LinkComponent={Link}
          to={getMediaLink(media)}
          sx={{ cursor: mediaEditable ? "default" : "pointer" }}
          disableRipple={mediaEditable}
          draggable={mediaDraggable}
        >
          {mediaEditable && (
            <>
              <IconOnImage position="topLeft" showBackgroud>
                <IoMove
                  size={30}
                  color={theme.palette.primary.main}
                  onMouseDown={() => setMediaDraggable(true)}
                  onMouseLeave={() => setMediaDraggable(false)}
                />
              </IconOnImage>
              <IconOnImage position="topRight" showBackgroud>
                <IoTrash
                  size={30}
                  color={theme.palette.error.main}
                  onClick={deleteMediaHandler.bind(null, media)}
                />
              </IconOnImage>
            </>
          )}
          <CardMedia
            sx={{ height: height }}
            image={
              process.env.REACT_APP_ASSET_URL + media.replaceAll("\\", "/")
            }
            title={media.split("\\")[2]}
          />
        </CardActionArea>
      </Card>
    );
  };

  return (
    <>
      {loadedItem && (
        <>
          <Stack color="text.primary" className={classes.infoArea}>
            <Typography variant="h2" color="primary">
              {loadedItem.name}
            </Typography>

            <Typography variant="subtitle1">
              {loadedItem.description}
            </Typography>

            <br />

            <Typography variant="caption" color="text.primary">
              a piece from
            </Typography>

            <Typography
              variant="p"
              component={Link}
              to={`/collection/${loadedItem.collectionId.id}`}
              color="secondary"
              sx={{ textDecoration: "none" }}
            >
              {loadedItem.collectionId.name}
            </Typography>
          </Stack>

          {loadedItem.collectionId.creator === loggedInUserId && (
            <Box className={classes.actionButtons}>
              <Box>
                <ImageUpload
                  buttonTitle="Add Photo"
                  onPicked={newMediaPickedHandler}
                  color="primary"
                  sx={{ width: "7rem" }}
                />
              </Box>

              {loadedItem.mediaList.length > 1 && (
                <Button
                  onClick={toggleEditMediaHandler}
                  sx={{ width: "7rem" }}
                  color="secondary"
                >
                  {mediaEditable ? "Finish Edit" : "Edit Media"}
                </Button>
              )}
            </Box>
          )}

          <MediaCard
            cardClass={classes.image}
            height="70vh"
            media={loadedItem.mediaList[0]}
          />

          <Box className={classes.mediaListContainer}>
            {loadedItem.mediaList.map((media) => {
              if (loadedItem.mediaList.indexOf(media) !== 0) {
                return (
                  <MediaCard
                    key={media}
                    cardClass={classes.mediaCard}
                    height="20vh"
                    media={media}
                  />
                );
              } else {
                return null;
              }
            })}
          </Box>
        </>
      )}

      {fetchItemError && <p>{fetchItemError}</p>}

      <ShareButtons iconSize={40} color="orange" />

      <ConfirmationModal
        show={showConfirmationModal}
        onSubmit={deleteMedia}
        onCancel={cancelDeleteMediaHandler}
        message="Do you realy want to delete this media?"
      />
    </>
  );
};

export default Item;
