import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import classes from "./Profile.module.css";
import CollectionOverview from "../../collections/components/CollectionOverview";
import Image from "../../shared/components/UIElements/Image";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import { useHttpClient } from "../../shared/hooks/http-hook";
import AddElementButton from "../../shared/components/UIElements/AddElementButton";
import Modal from "../../shared/components/UIElements/Modal";
import Button from "../../shared/components/FormElements/Button";

const Profile = () => {
  const userId = useSelector((state) => state.auth.userId);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [userData, setUserData] = useState(null);
  const [pickedCollectionImage, setPickedCollectionImage] = useState(null);
  const [showNewCollectionModal, setShowNewCollectionModal] = useState(false);
  const nameRef = useRef();
  const descriptionRef = useRef();

  const updateUserInfo = useCallback(async () => {
    if (userId) {
      const responseData = await sendRequest(`/users/${userId}`);
      setUserData(responseData);
    }
  }, [userId]);

  useEffect(() => {
    /* const fetchUser = async () => {
      const responseData = await sendRequest(`/users/${userId}`);
      setUserData(responseData);
    };
    fetchUser(); */
    updateUserInfo();
  }, [updateUserInfo]);

  const profilePicturePickedHandler = async (pickedFile) => {
    try {
      const imageData = new FormData();
      imageData.append("image", pickedFile);
      const responseData = await sendRequest(
        `/users/changePicture/${userId}`,
        "PATCH",
        imageData
      );
      setUserData(responseData);
    } catch (err) {}
  };

  const addCollectionHandler = () => {
    setShowNewCollectionModal(true);
  };

  const closeAddCollectionFormHandler = () => {
    setShowNewCollectionModal(false);
  };

  const submitAddCollectionHandler = async (event) => {
    const body = new FormData();
    body.append("name", nameRef.current.value);
    body.append("description", descriptionRef.current.value);
    body.append("image", pickedCollectionImage);

    try {
      const responseData = await sendRequest(
        "/collections",
        "POST",
        body,
        true
      );
      setShowNewCollectionModal(false);
      updateUserInfo();
    } catch (err) {
      console.log(err);
    }
  };

  const pickedCoverPictureHandler = (pickedFile) => {
    setPickedCollectionImage(pickedFile);
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
              onClick={addCollectionHandler}
            />
            {userData.collectionList.map((collection) => {
              return (
                <CollectionOverview
                  key={collection.id}
                  collectionId={collection.id}
                  collectionName={collection.name}
                  coverPicture={collection.coverPicture}
                />
              );
            })}
          </section>
        </>
      )}

      {/* Add Collection Modal */}
      <Modal
        show={!!showNewCollectionModal}
        onCancel={closeAddCollectionFormHandler}
        header="Add Collection"
        footer={
          <div style={{ display: "flex", justifyContent: "left", gap: "1rem" }}>
            <Button onClick={submitAddCollectionHandler}>Add Collection</Button>
            <Button inverse onClick={closeAddCollectionFormHandler}>
              Close
            </Button>
          </div>
        }
      >
        <div>
          <input type="text" ref={nameRef} placeholder="Collection Name" />
          <input type="text" ref={descriptionRef} placeholder="Description" />
          <ImageUpload
            id=""
            buttonTitle="Select Cover Picture"
            onPicked={pickedCoverPictureHandler}
            showPreview
          />
        </div>
      </Modal>
    </>
  );
};

export default Profile;
