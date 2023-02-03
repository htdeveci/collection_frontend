import { useState } from "react";

import Button from "../FormElements/Button";
import ImageUpload from "../FormElements/ImageUpload";
import Input from "../FormElements/Input";
import Modal from "../UIElements/Modal";
import { useForm } from "../../hooks/form-hook";
import { VALIDATOR_REQUIRE } from "../../utils/validators";

const ElementModal = (props) => {
  const [pickedImage, setPickedImage] = useState(null);
  const [visibility, setVisibility] = useState("everyone");

  const {
    type,
    showModal,
    closeModalHandler,
    initialElement,
    submitHandler: submitHandlerProp,
    collectionId,
  } = props;

  const [formState, inputHandler] = useForm(
    {
      name: {
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

  const selectedElement = initialElement;

  const submitHandler = (event) => {
    event.target.disabled = true;
    if (type === "collection") {
      let body;
      if (pickedImage) {
        body = new FormData();
        body.append("name", formState.inputs.name.value);
        body.append("description", formState.inputs.description.value);
        body.append("visibility", visibility);
        body.append("image", pickedImage);
      } else {
        body = JSON.stringify({
          name: formState.inputs.name.value,
          description: formState.inputs.description.value,
          visibility,
        });
      }
      submitHandlerProp(body);
    } else if (type === "item") {
      let body;
      if (pickedImage) {
        body = new FormData();
        body.append("name", formState.inputs.name.value);
        body.append("description", formState.inputs.description.value);
        body.append("collectionId", collectionId);
        body.append("visibility", visibility);
        body.append("image", pickedImage);
      } else {
        body = JSON.stringify({
          name: formState.inputs.name.value,
          description: formState.inputs.description.value,
          collectionId: collectionId,
          visibility,
        });
      }
      submitHandlerProp(body);
    }
    event.target.disabled = false;
    resetStates();
  };

  const resetStates = () => {
    // setCollectionImage(null);
    setPickedImage(null);
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

  const visibilityChangeHandler = (event) => {
    setVisibility(event.target.value);
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
          initialValue={selectedElement ? selectedElement.name : ""}
        />
        <Input
          id="description"
          type="text"
          placeholder="Description"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          initialValue={selectedElement ? selectedElement.description : ""}
        />

        <ImageUpload
          id="coverPicture"
          buttonTitle="Select Cover Picture"
          onPicked={(pickedFile) => {
            setPickedImage(pickedFile);
          }}
          showPreview
          onInput={inputHandler}
          initialValue={
            selectedElement
              ? type === "collection"
                ? selectedElement.coverPicture
                : selectedElement.mediaList[0]
              : null
          }
          small
        />

        <div>
          <label htmlFor="visibilty">Who can see this {type}? </label>
          <select
            id="visibilty"
            defaultValue={
              selectedElement ? selectedElement.visibility : "everyone"
            }
            onChange={visibilityChangeHandler}
          >
            <option value="self">Just Me</option>
            <option value="everyone">Everyone</option>
          </select>
        </div>
      </div>
    </Modal>
  );
};

export default ElementModal;
