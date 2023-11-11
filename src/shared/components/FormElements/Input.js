import { useEffect, useReducer } from "react";
import TextField from "@mui/material/TextField";

// import classes from "./Input.module.css";
import { validate } from "../../utils/validators";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH": {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
};

const Input = ({
  id,
  onInput,
  initialValue,
  type,
  label,
  helperText = "",
  validators,
}) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue || "",
    isTouched: false,
    isValid: initialValue ? true : false,
  });

  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  return (
    <TextField
      id={id}
      type={type}
      label={label}
      onChange={changeHandler}
      onBlur={touchHandler}
      value={value}
      helperText={!isValid && inputState.isTouched ? helperText : ""}
      error={!isValid && inputState.isTouched}
    />
  );
};

export default Input;
