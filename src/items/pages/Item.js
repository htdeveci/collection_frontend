import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import classes from "./Item.module.css";
import Image from "../../shared/components/UIElements/Image";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Card from "../../shared/components/UIElements/Card";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import Button from "../../shared/components/FormElements/Button";
import { IoTrash, IoMove } from "react-icons/io5";
import IconOnImage from "../../shared/components/UIElements/IconOnImage";
import ShareButtons from "../../shared/components/share/ShareButtons";
import ConfirmationModal from "../../shared/components/UIElements/ConfirmationModal";

const Item = () => {
  const loggedInUserId = useSelector((state) => state.auth.userId);
  const itemId = useParams().itemId;
  const { sendRequest: fetchItemSendRequest } = useHttpClient();
  const { sendRequest: addMediaSendRequest } = useHttpClient();
  const { sendRequest: deleteMediaSendRequest } = useHttpClient();
  const [loadedItem, setLoadedItem] = useState(null);
  const [mediaEditable, setMediaEditable] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedMediaName, setSelectedMediaName] = useState(null);

  const fetchItem = useCallback(async () => {
    try {
      const responseData = await fetchItemSendRequest(`/items/${itemId}`);
      setLoadedItem(responseData);
    } catch (err) {}
  }, [fetchItemSendRequest, itemId]);

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

  return (
    <>
      {loadedItem && (
        <>
          <div className={classes.infoArea}>
            <h2>{loadedItem.name}</h2>
            <p>{loadedItem.description}</p>
            <p>
              {"a piece of "}
              <Link to={`/collection/${loadedItem.collectionId.id}`}>
                {loadedItem.collectionId.name}
              </Link>
            </p>

            {loadedItem.collectionId.creator === loggedInUserId && (
              <div className={classes.actionButtons}>
                <ImageUpload
                  buttonTitle="Add Photo"
                  onPicked={newMediaPickedHandler}
                />

                {loadedItem.mediaList.length > 1 && (
                  <Button onClick={toggleEditMediaHandler} width="150px">
                    {mediaEditable ? "Finish Edit" : "Edit Media"}
                  </Button>
                )}
              </div>
            )}
          </div>

          <Card className={classes.image} animate={!mediaEditable}>
            <Link
              to={getMediaLink(loadedItem.mediaList[0])}
              style={mediaEditable ? { cursor: "default" } : null}
            >
              {mediaEditable && (
                <>
                  <IconOnImage position="topLeft" showBackgroud>
                    <IoMove size={30} color="yellow" />
                  </IconOnImage>
                  <IconOnImage position="topRight" showBackgroud>
                    <IoTrash
                      size={30}
                      color="red"
                      onClick={deleteMediaHandler.bind(
                        null,
                        loadedItem.mediaList[0]
                      )}
                    />
                  </IconOnImage>
                </>
              )}
              <Image
                src={loadedItem.mediaList[0]}
                alt={loadedItem.mediaList[0].split("\\")[2]}
              />
            </Link>
          </Card>

          <div className={classes.mediaListContainer}>
            {loadedItem.mediaList.map((media) => {
              if (loadedItem.mediaList.indexOf(media) !== 0) {
                return (
                  <Card
                    key={media}
                    className={classes.mediaCard}
                    animate={!mediaEditable}
                  >
                    <Link
                      to={getMediaLink(media)}
                      style={mediaEditable ? { cursor: "default" } : null}
                    >
                      {mediaEditable && (
                        <>
                          <IconOnImage position="topLeft" showBackgroud>
                            <IoMove size={30} color="yellow" />
                          </IconOnImage>
                          <IconOnImage position="topRight" showBackgroud>
                            <IoTrash
                              size={30}
                              color="red"
                              onClick={deleteMediaHandler.bind(null, media)}
                            />
                          </IconOnImage>
                        </>
                      )}
                      <Image src={media} alt={media.split("\\")[2]} />
                    </Link>
                  </Card>
                );
              } else {
                return <div key={media}></div>;
              }
            })}
          </div>
        </>
      )}

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
