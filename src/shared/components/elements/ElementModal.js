import { useEffect, useState } from "react";
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

import classes from "./ElementModal.module.css";
import ImageUpload from "../FormElements/ImageUpload";
import Input from "../FormElements/Input";
import { useForm } from "../../hooks/form-hook";
import { VALIDATOR_REQUIRE } from "../../utils/validators";
import { getImageSrcByRawPath } from "../../utils/image-path-converter";

const ElementModal = ({
  type,
  showModal,
  closeModalHandler,
  selectedElement,
  submitHandler: submitHandlerProp,
  elementId,
  onVisibilityChange,
}) => {
  const [pickedImage, setPickedImage] = useState(null);
  const [visibility, setVisibility] = useState("everyone");
  const theme = useTheme();

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

  useEffect(() => {
    if (showModal) setVisibility("everyone");
  }, [showModal]);

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
        body.append("collectionId", elementId);
        body.append("visibility", visibility);
        body.append("image", pickedImage);
      } else {
        body = JSON.stringify({
          name: formState.inputs.name.value,
          description: formState.inputs.description.value,
          collectionId: elementId,
          visibility,
        });
      }
      submitHandlerProp(body);
    }
    event.target.disabled = false;
  };

  const getCapitalized = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  const getHeader = () => {
    if (selectedElement) return `Edit ${getCapitalized(type)}`;
    else return `Add ${getCapitalized(type)}`;
  };

  const visibilityChangeHandler = (event) => {
    onVisibilityChange(event.target.value);
    setVisibility(event.target.value);
  };

  return (
    <Dialog open={showModal} onClose={closeModalHandler}>
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
              value={selectedElement ? selectedElement.visibility : visibility}
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
                  ? getImageSrcByRawPath(selectedElement.coverPicture)
                  : getImageSrcByRawPath(selectedElement.mediaList[0])
                : null
            }
          />
        </Box>
      </DialogContent>

      <DialogActions className={classes.dialogActions}>
        <Button onClick={closeModalHandler} color="error">
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
