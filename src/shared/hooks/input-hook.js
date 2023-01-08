import { useEffect, useState } from "react";

import { validate } from "../utils/validators";

const useInput = (validators) => {
  const [value, setValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsValid(validate(value, validators));
    setHasError(!isValid && isTouched);
  }, [value, isTouched, isValid, validators]);

  const valueChangeHandler = (event) => {
    setValue(event.target.value);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setValue("");
    setIsTouched(false);
  };

  return [
    value,
    isValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
    setIsTouched,
  ];
};

export default useInput;
