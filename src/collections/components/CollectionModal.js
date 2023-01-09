import { useState } from "react";

import Button from "../../shared/components/FormElements/Button";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import Input from "../../shared/components/FormElements/Input";
import Modal from "../../shared/components/UIElements/Modal";
import { useForm } from "../../shared/hooks/form-hook";
import { VALIDATOR_REQUIRE } from "../../shared/utils/validators";

const CollectionModal = (props) => {
  const [pickedCollectionImage, setPickedCollectionImage] = useState(null);
  // const [selectedCollection, setSelectedCollection] = useState(null);
  const [formState, inputHandler] = useForm(
    {
      collectionName: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      coverPicture: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  /* if (props.collection) {
    formState.inputs.coverPicture.isValid = true;
  } */
  const selectedCollection = props.collection;

  const submitHandler = (event) => {
    event.target.disabled = true;
    let body;
    if (pickedCollectionImage) {
      body = new FormData();
      body.append("name", formState.inputs.collectionName.value);
      body.append("description", formState.inputs.description.value);
      body.append("image", pickedCollectionImage);
    } else {
      body = JSON.stringify({
        name: formState.inputs.collectionName.value,
        description: formState.inputs.description.value,
      });
    }
    props.submitHandler(body);
    event.target.disabled = false;
    resetStates();
  };

  const resetStates = () => {
    // setCollectionImage(null);
    setPickedCollectionImage(null);
    // setLoadedCollection(false);
  };

  const cancelHandler = () => {
    props.closeModalHandler();
    resetStates();
  };

  return (
    <Modal
      show={!!props.showModal}
      onCancel={cancelHandler}
      header={props.collection ? "Edit Collection" : "Add Collection"}
      footer={
        <div style={{ display: "flex", justifyContent: "left", gap: "1rem" }}>
          <Button onClick={submitHandler} disabled={!formState.isValid}>
            {props.collection ? "Update Collection" : "Add Collection"}
          </Button>
          <Button inverse onClick={cancelHandler}>
            Close
          </Button>
        </div>
      }
    >
      <div>
        <Input
          id="collectionName"
          type="text"
          placeholder="Collection Name"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          initialValue={selectedCollection ? selectedCollection.name : ""}
        />
        <Input
          id="description"
          type="text"
          placeholder="Description"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          initialValue={
            selectedCollection ? selectedCollection.description : ""
          }
        />

        <ImageUpload
          id="coverPicture"
          buttonTitle="Select Cover Picture"
          onPicked={(pickedFile) => {
            setPickedCollectionImage(pickedFile);
          }}
          showPreview
          onInput={inputHandler}
          initialValue={
            selectedCollection ? selectedCollection.coverPicture : null
          }
        />
      </div>
    </Modal>
  );
};

export default CollectionModal;
