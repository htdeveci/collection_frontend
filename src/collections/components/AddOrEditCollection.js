import { useEffect, useState } from "react";

import Button from "../../shared/components/FormElements/Button";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import Input from "../../shared/components/FormElements/Input";
import Modal from "../../shared/components/UIElements/Modal";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { VALIDATOR_REQUIRE } from "../../shared/utils/validators";

const AddOrEditCollection = (props) => {
  const [formState, inputHandler, setFormData] = useForm({
    collectionName: {
      value: "",
      isValid: false,
    },
    description: {
      value: "",
      isValid: false,
    },
  });
  const { sendRequest } = useHttpClient();

  const [pickedCollectionImage, setPickedCollectionImage] = useState(null);
  const [collectionImage, setCollectionImage] = useState(null);

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const responseData = await sendRequest(
          `/collections/${props.collectionId}`
        );
        setFormData({
          inputData: {
            collectionName: {
              value: responseData.name,
              isValid: true,
            },
            description: {
              value: responseData.description,
              isValid: true,
            },
          },
          formValidity: true,
        });
        setCollectionImage(responseData.coverPicture);
      } catch (err) {
        console.log(err);
      }
    };

    if (!!props.showModal && props.mode === "edit") {
      fetchCollection();
    }
  }, [
    props.showModal,
    props.mode,
    sendRequest,
    props.collectionId,
    setFormData,
  ]);

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
          <Button onClick={submitHandler} disabled={!formState.isValid}>
            {props.mode === "edit" ? "Update Collection" : "Add Collection"}
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
          initialValue={
            formState.inputs.collectionName &&
            formState.inputs.collectionName.value
          }
          initialValid={
            formState.inputs.collectionName &&
            formState.inputs.collectionName.isValid
          }
        />
        <Input
          id="description"
          type="text"
          placeholder="Description"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          initialValue={
            formState.inputs.description && formState.inputs.description.value
          }
          initialValid={
            formState.inputs.description && formState.inputs.description.isValid
          }
        />

        <ImageUpload
          id="coverPicture"
          buttonTitle="Select Cover Picture"
          onPicked={(pickedFile) => {
            setPickedCollectionImage(pickedFile);
          }}
          showPreview
          initialImage={collectionImage}
          onInput={inputHandler}
        />
      </div>
    </Modal>
  );
};

export default AddOrEditCollection;
