import { useState } from "react";

import Button from "../FormElements/Button";
import ImageUpload from "../FormElements/ImageUpload";
import Input from "../FormElements/Input";
import Modal from "../UIElements/Modal";
import { useForm } from "../../hooks/form-hook";
import { VALIDATOR_REQUIRE } from "../../utils/validators";

const ElementModal = (props) => {
  const [pickedCollectionImage, setPickedCollectionImage] = useState(null);

  const {
    type,
    showModal,
    closeModalHandler,
    initialElement,
    submitHandlerProp,
  } = props;

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

  const selectedCollection = initialElement;

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
    submitHandlerProp(body);
    event.target.disabled = false;
    resetStates();
  };

  const resetStates = () => {
    // setCollectionImage(null);
    setPickedCollectionImage(null);
    // setLoadedCollection(false);
  };

  const cancelHandler = () => {
    closeModalHandler();
    resetStates();
  };

  const getCapitalized = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  const getHeader = () => {
    if (initialElement) return `Edit ${getCapitalized(type)}`;
    else return `Add ${getCapitalized(type)}`;
  };

  return (
    <Modal
      show={!!showModal}
      onCancel={cancelHandler}
      header={getHeader()}
      footer={
        <div style={{ display: "flex", justifyContent: "left", gap: "1rem" }}>
          <Button onClick={submitHandler} disabled={!formState.isValid}>
            {getHeader()}
          </Button>
          <Button inverse onClick={cancelHandler}>
            Close
          </Button>
        </div>
      }
    >
      <div>
        <Input
          id="name"
          type="text"
          placeholder={`${getCapitalized(type)} Name`}
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

export default ElementModal;
