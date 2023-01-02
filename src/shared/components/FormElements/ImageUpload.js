import { useEffect, useRef, useState } from "react";

import classes from "./ImageUpload.module.css";
import Button from "./Button";

const ImageUpload = (props) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const filePickerRef = useRef();

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
      {props.showPreview && (
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
