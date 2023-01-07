import { useState } from "react";
import { useDispatch } from "react-redux";

import classes from "./Authenticate.module.css";
import Card from "../../shared/components/UIElements/Card";
import useInput from "../../shared/hooks/use-input";
import Modal from "../../shared/components/UIElements/Modal";
import Button from "../../shared/components/FormElements/Button";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { authAction } from "../../shared/store/auth";

const Login = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { error, sendRequest, clearError } = useHttpClient();
  const dispatch = useDispatch();

  const {
    value: username,
    isValid: usernameIsValid,
    hasError: usernameHasError,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    reset: usernameReset,
    setIsTouched: usernameSetIsTouched,
  } = useInput((value) => value.trim() !== "");

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset,
    setIsTouched: emailSetIsTouched,
  } = useInput((value) => value.includes("@"));

  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: passwordReset,
    setIsTouched: passwordSetIsTouched,
  } = useInput((value) => value.trim().length >= 6);

  const {
    value: confirmPassword,
    isValid: confirmPasswordIsValid,
    hasError: confirmPasswordHasError,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    reset: confirmPasswordReset,
    setIsTouched: confirmPasswordSetIsTouched,
  } = useInput((value) => value === password);

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    usernameSetIsTouched(true);
    emailSetIsTouched(true);
    passwordSetIsTouched(true);
    confirmPasswordSetIsTouched(true);

    if (emailIsValid && passwordIsValid) {
      let url = "/users/login";
      let body = JSON.stringify({
        email,
        password,
      });

      if (!isLoginMode) {
        if (usernameIsValid && confirmPasswordIsValid) {
          url = "/users/register";
          body = JSON.stringify({
            username,
            email,
            password,
          });
        } else return;
      }

      try {
        const responseData = await sendRequest(url, "POST", body);

        usernameReset();
        emailReset();
        passwordReset();
        confirmPasswordReset();

        dispatch(
          authAction.login({
            token: responseData.token,
            userId: responseData.userId,
          })
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  const switchModeHandler = () => {
    setIsLoginMode((prevState) => !prevState);
  };

  return (
    <>
      <Modal
        show={!!error}
        onCancel={clearError}
        header="An Error Occurred!"
        footer={<Button onClick={clearError}>Okay</Button>}
      >
        <p>{error}</p>
      </Modal>
      <div className={classes.formContainer}>
        <Card className={classes.cardContainer}>
          <form onSubmit={formSubmitHandler}>
            {isLoginMode ? <h2>Login</h2> : <h2>Register</h2>}
            {!isLoginMode && (
              <div>
                <input
                  type={"text"}
                  placeholder="Username"
                  value={username}
                  onChange={usernameChangeHandler}
                  onBlur={usernameBlurHandler}
                />
                {usernameHasError && <p>Username can not be empty.</p>}
              </div>
            )}

            <div>
              <input
                type={"email"}
                placeholder={"E-mail"}
                value={email}
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
              />
              {emailHasError && <p>Must be a valid e-mail.</p>}
            </div>

            <div>
              <input
                type={"password"}
                placeholder="Password"
                value={password}
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
              />
              {passwordHasError && (
                <p>Password must contain at least six characters.</p>
              )}
            </div>

            {!isLoginMode && (
              <div>
                <input
                  type={"password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={confirmPasswordChangeHandler}
                  onBlur={confirmPasswordBlurHandler}
                />
                {confirmPasswordHasError && <p>Passwords must be same.</p>}
              </div>
            )}

            <div>
              <Button type="submit">
                {isLoginMode ? "LOGIN" : "REGISTER"}
              </Button>
            </div>
          </form>
          <Button inverse small onClick={switchModeHandler}>
            SWITCH TO {isLoginMode ? "REGISTER" : "LOGIN"}
          </Button>
        </Card>
      </div>
    </>
  );
};

export default Login;
