import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import classes from "./Profile.module.css";
import CollectionOverview from "../../collections/components/CollectionOverview";
import Image from "../../shared/components/UIElements/Image";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import { useHttpClient } from "../../shared/hooks/http-hook";
import AddElementButton from "../../shared/components/UIElements/AddElementButton";
import AddOrEditCollection from "../../collections/components/AddOrEditCollection";

const Profile = () => {
  const userId = useParams().userId;
  const { error: getUserError, sendRequest: getUserSendRequest } =
    useHttpClient();
  const { sendRequest: changeProfilePictureSendRequest } = useHttpClient();
  const { sendRequest: addCollectionSendRequest } = useHttpClient();
  const { sendRequest: deleteCollectionSendRequest } = useHttpClient();
  const [userData, setUserData] = useState(null);
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const [collectionModalMode, setCollectionModalMode] = useState("add");
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);

  const updateUserInfo = useCallback(async () => {
    const responseData = await getUserSendRequest(`/users/${userId}`);
    setUserData(responseData);
  }, [userId, getUserSendRequest]);

  useEffect(() => {
    updateUserInfo();
  }, [updateUserInfo]);

  const profilePicturePickedHandler = async (pickedFile) => {
    try {
      const imageData = new FormData();
      imageData.append("image", pickedFile);
      const responseData = await changeProfilePictureSendRequest(
        `/users/changePicture/${userId}`,
        "PATCH",
        imageData
      );
      setUserData(responseData);
    } catch (err) {}
  };

  const openCollectionModalHandler = (modalMode, collectionId = null) => {
    setCollectionModalMode(modalMode);
    setSelectedCollectionId(collectionId);
    setShowCollectionModal(true);
  };

  const closeCollectionModalHandler = () => {
    setShowCollectionModal(false);
  };

  const submitCollectionModalHandler = async (body) => {
    const url =
      collectionModalMode === "add"
        ? "/collections"
        : `/collections/${selectedCollectionId}`;

    const method = collectionModalMode === "add" ? "POST" : "PATCH";

    console.log(body);
    try {
      await addCollectionSendRequest(url, method, body, true);
      setShowCollectionModal(false);
      updateUserInfo();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCollectionHandler = async (collectionId) => {
    try {
      await deleteCollectionSendRequest(
        `/collections/${collectionId}`,
        "DELETE",
        null,
        true
      );
      updateUserInfo();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {userData && (
        <>
          <header className={classes.header}>
            <Image
              src={userData.profilePicture ? userData.profilePicture : null}
              alt="profile"
              width={150}
              height={150}
              borderRadius={50}
            />

            <div>
              <h1 className={classes.username}> {userData.username}</h1>
              <ImageUpload
                buttonTitle="Change Profile Picture"
                onPicked={profilePicturePickedHandler}
              />
            </div>
          </header>

          <section className={classes.collectionOverviewSection}>
            <AddElementButton
              buttonName="Add Collection"
              onClick={openCollectionModalHandler.bind(null, "add", null)}
            />
            {userData.collectionList.map((collection) => {
              return (
                <CollectionOverview
                  key={collection.id}
                  collectionId={collection.id}
                  collectionName={collection.name}
                  coverPicture={collection.coverPicture}
                  editHandler={openCollectionModalHandler.bind(
                    null,
                    "edit",
                    collection.id
                  )}
                  deleteHandler={deleteCollectionHandler}
                  showActions
                />
              );
            })}
          </section>
        </>
      )}

      {getUserError && <p>User not found!</p>}

      <AddOrEditCollection
        showModal={showCollectionModal}
        closeModalHandler={closeCollectionModalHandler}
        mode={collectionModalMode}
        submitHandler={submitCollectionModalHandler}
        collectionId={selectedCollectionId}
      />
    </>
  );
};

export default Profile;
