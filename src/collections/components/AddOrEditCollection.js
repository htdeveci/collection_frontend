import { useEffect, useState } from "react";

import Button from "../../shared/components/FormElements/Button";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import Modal from "../../shared/components/UIElements/Modal";
import { useHttpClient } from "../../shared/hooks/http-hook";

const AddOrEditCollection = (props) => {
  const { sendRequest } = useHttpClient();

  const [pickedCollectionImage, setPickedCollectionImage] = useState(null);
  const [collectionName, setCollectionName] = useState("");
  const [collectionDescription, setCollectionDescription] = useState("");
  const [collectionImage, setCollectionImage] = useState(null);

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const responseData = await sendRequest(
          `/collections/${props.collectionId}`
        );
        setCollectionName(responseData.name);
        setCollectionDescription(responseData.description);
        setCollectionImage(responseData.coverPicture);
      } catch (err) {
        console.log(err);
      }
    };

    if (!!props.showModal && props.mode === "edit") {
      fetchCollection();
    }
  }, [props.showModal, props.mode, sendRequest]);

  const submitHandler = (event) => {
    event.target.disabled = true;
    let body;
    if (pickedCollectionImage) {
      body = new FormData();
      body.append("name", collectionName);
      body.append("description", collectionDescription);
      body.append("image", pickedCollectionImage);
    } else {
      body = JSON.stringify({
        name: collectionName,
        description: collectionDescription,
      });
    }
    props.submitHandler(body);
    event.target.disabled = false;
    resetStates();
  };

  const nameChangeHandler = (event) => {
    setCollectionName(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setCollectionDescription(event.target.value);
  };

  const resetStates = () => {
    setCollectionName("");
    setCollectionDescription("");
    setCollectionImage(null);
    setPickedCollectionImage(null);
  };

  const cancelHandler = () => {
    props.closeModalHandler();
    resetStates();
  };

  return (
    <Modal
      show={!!props.showModal}
      onCancel={cancelHandler}
      header={props.mode === "edit" ? "Edit Collection" : "Add Collection"}
      footer={
        <div style={{ display: "flex", justifyContent: "left", gap: "1rem" }}>
          <Button onClick={submitHandler}>
            {props.mode === "edit" ? "Update Collection" : "Add Collection"}
          </Button>
          <Button inverse onClick={cancelHandler}>
            Close
          </Button>
        </div>
      }
    >
      <div>
        <input
          type="text"
          placeholder="Collection Name"
          value={collectionName}
          onChange={nameChangeHandler}
        />
        <input
          type="text"
          placeholder="Description"
          value={collectionDescription}
          onChange={descriptionChangeHandler}
        />
        <ImageUpload
          id=""
          buttonTitle="Select Cover Picture"
          onPicked={(pickedFile) => {
            setPickedCollectionImage(pickedFile);
          }}
          showPreview
          initialImage={collectionImage}
        />
      </div>
    </Modal>
  );
};

export default AddOrEditCollection;
