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

  const onSubmitHandler = (value, isValid) => {
    console.log(value);
    console.log(isValid);
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
        />
        <Input
          id="description"
          type="text"
          placeholder="Description"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
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
