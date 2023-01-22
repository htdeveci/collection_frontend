import { useState } from "react";
import { useSelector } from "react-redux";

import classes from "./DisplayProfileOrCollection.module.css";
import ElementOverview from "./ElementOverview";
import ImageUpload from "../FormElements/ImageUpload";
import AddElementButton from "./AddElementButton";
import Image from "../UIElements/Image";
import { useHttpClient } from "../../hooks/http-hook";
import ElementModal from "./ElementModal";
import { Link } from "react-router-dom";

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
  const [showModal, setShowModal] = useState(false);
  const [selectedElement, setSelectedElement] = useState(false);

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

  const openModalHandler = (element = null) => {
    setSelectedElement(element);
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setSelectedElement(null);
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
      setShowModal(false);
      setSelectedElement(null);
      updateData();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCollectionHandler = async (elementId) => {
    try {
      await deleteElementSendRequest(
        `/${type === "profile" ? "collections" : "items"}/${elementId}`,
        "DELETE",
        null,
        true
      );
      updateData();
    } catch (err) {
      console.log(err);
    }
  };

  const isUserAuthorized = () => {
    if (type === "profile") return id === loggedInUserId;
    else return data.creator.id === loggedInUserId;
  };

  return (
    <>
      {data && (
        <>
          <header className={classes.header}>
            <Image
              src={
                type === "profile"
                  ? data.profilePicture
                    ? data.profilePicture
                    : null
                  : data.coverPicture
                  ? data.coverPicture
                  : null
              }
              alt={type === "profile" ? "profile" : "cover"}
              width={150}
              height={150}
              borderRadius={50}
            />

            <div>
              <h1 className={classes.username}>
                {type === "profile" ? data.username : data.name}
              </h1>
              {type === "collection" && (
                <p>
                  {"created by "}
                  <Link to={`/profile/${data.creator.id}`}>
                    {data.creator.username}
                  </Link>
                </p>
              )}
              {isUserAuthorized() && (
                <ImageUpload
                  buttonTitle={
                    type === "profile"
                      ? "Change Profile Picture"
                      : "Change Cover Picture"
                  }
                  onPicked={picturePickedHandler}
                />
              )}
            </div>
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
                    collectionName={element.name}
                    coverPicture={
                      type === "profile"
                        ? element.coverPicture
                        : element.mediaList[0]
                    }
                    editHandler={openModalHandler.bind(null, element)}
                    deleteHandler={deleteCollectionHandler.bind(
                      null,
                      element.id
                    )}
                    showActions={isUserAuthorized()}
                  />
                );
              }
            )}
          </section>

          <ElementModal
            type={type === "profile" ? "collection" : "item"}
            showModal={showModal}
            closeModalHandler={closeModalHandler}
            submitHandler={submitModalHandler}
            initialElement={selectedElement}
            collectionId={id}
          />
        </>
      )}
      {dataError && <p>User not found!</p>}
    </>
  );
};

export default DisplayProfileOrCollection;
