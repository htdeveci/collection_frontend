import { useEffect, useRef, useState } from "react";

import classes from "./ImageUpload.module.css";
import Button from "./Button";
import { IMAGE_BASE_URL } from "../../utils/global-constants";
import Image from "../UIElements/Image";

const ImageUpload = (props) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [initialImage, setInitialImage] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const filePickerRef = useRef();

  const { id, onInput, initialImageProp } = props;
  /*
  useEffect(() => {
    onInput(id, file, isValid);
  }, [id, file, isValid, onInput]);
*/
  useEffect(() => {
    if (initialImageProp) {
      setIsValid(true);
      setInitialImage(initialImageProp);
    }

    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
      setInitialImage(null);
    };
    fileReader.readAsDataURL(file);
  }, [props.initialImage, file]);

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const pickedHandler = (event) => {
    if (event.target.files && event.target.files.length === 1) {
      const pickedFile = event.target.files[0];
      if (pickedFile.type.includes("image")) {
        setFile(pickedFile);
        props.onPicked(pickedFile);
      }
    }
  };

  return (
    <>
      <input
        id={props.id}
        style={{ display: "none" }}
        type="file"
        accept="image/*"
        ref={filePickerRef}
        onChange={pickedHandler}
      />
      {!!initialImage && (
        <Image
          className={classes.preview}
          src={initialImage}
          alt="CoverPicture"
          width="13rem"
          height="13rem"
          borderRadius="0"
        />
      )}
      {!initialImage && props.showPreview && (
        <div className={classes.preview}>
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
      )}
      <Button type="button" onClick={pickImageHandler} small>
        {props.buttonTitle}
      </Button>
    </>
  );
};

export default ImageUpload;
