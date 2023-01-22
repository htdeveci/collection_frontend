import { useEffect, useRef, useState } from "react";

import classes from "./ImageUpload.module.css";
import Button from "./Button";
import Image from "../UIElements/Image";

const ImageUpload = ({
  id,
  initialValue,
  onInput,
  onPicked,
  showPreview,
  buttonTitle,
  small,
}) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [initialImage, setInitialImage] = useState(null);
  const filePickerRef = useRef();

  useEffect(() => {
    if (onInput) {
      if (initialValue) {
        setInitialImage(initialValue);
        onInput(id, initialValue, true);
      } else {
        onInput(id, "", false);
      }
    }
  }, [id, initialValue, onInput]);

  useEffect(() => {
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const pickedHandler = (event) => {
    if (event.target.files && event.target.files.length === 1) {
      const pickedFile = event.target.files[0];
      if (pickedFile.type.includes("image")) {
        setFile(pickedFile);
        onPicked(pickedFile);
        setInitialImage(null);
        if (onInput) onInput(id, pickedFile, true);
      }
    }
  };

  return (
    <>
      <input
        id={id}
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
      {!initialImage && showPreview && (
        <div className={classes.preview}>
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
      )}
      <Button type="button" onClick={pickImageHandler} small={small}>
        {buttonTitle}
      </Button>
    </>
  );
};

export default ImageUpload;
