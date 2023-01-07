import { useState } from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  const [value, setValue] = useState("");

  const inputChangeHandler = (event) => {
    setValue(event.target.value);
  };

  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      value={value}
      onChange={inputChangeHandler}
    />
  );
};

export default Input;
