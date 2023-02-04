import { useState } from "react";

import classes from "./ElementModal.module.css";
import ImageUpload from "../FormElements/ImageUpload";
import Input from "../FormElements/Input";
import { useForm } from "../../hooks/form-hook";
import { VALIDATOR_REQUIRE } from "../../utils/validators";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
} from "@mui/material";

const ElementModal = (props) => {
  const [pickedImage, setPickedImage] = useState(null);
  const [visibility, setVisibility] = useState("everyone");
  const theme = useTheme();

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
    <Dialog open={showModal} onClose={cancelHandler}>
      <DialogTitle bgcolor={theme.palette.primary.dark}>
        {getHeader()}
      </DialogTitle>

      <DialogContent className={classes.dialogContent}>
        <Box className={classes.inputFields}>
          <Input
            id="name"
            type="text"
            label={`${getCapitalized(type)} Name`}
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            initialValue={selectedElement ? selectedElement.name : ""}
            helperText="Name can not be empty."
          />

          <Input
            id="description"
            type="text"
            label="Description"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            initialValue={selectedElement ? selectedElement.description : ""}
            helperText="Description can not be empty."
          />

          <FormControl>
            <InputLabel id="visibilitySelection">Visible to</InputLabel>
            <Select
              id="visibilitySelection"
              label="Visible to"
              defaultValue={
                selectedElement ? selectedElement.visibility : "everyone"
              }
              onChange={visibilityChangeHandler}
            >
              <MenuItem value="self">Just Me</MenuItem>
              <MenuItem value="everyone">Everyone</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box className={classes.imageField}>
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
          />
        </Box>
      </DialogContent>

      <DialogActions className={classes.dialogActions}>
        <Button onClick={cancelHandler} color="error">
          Close
        </Button>

        <Button
          onClick={submitHandler}
          disabled={!formState.isValid}
          variant="contained"
          color="success"
        >
          {getHeader()}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ElementModal;
