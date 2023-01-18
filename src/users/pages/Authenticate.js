import { useState } from "react";
import { useDispatch } from "react-redux";

import classes from "./Authenticate.module.css";
import Card from "../../shared/components/UIElements/Card";
import Modal from "../../shared/components/UIElements/Modal";
import Button from "../../shared/components/FormElements/Button";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { authAction } from "../../shared/store/auth";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import Input from "../../shared/components/FormElements/Input";

const Login = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { error, sendRequest, clearError } = useHttpClient();
  const dispatch = useDispatch();
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    if (formState.isValid) {
      const inputs = formState.inputs;
      let url = "/users/login";
      let body = JSON.stringify({
        email: inputs.email.value,
        password: inputs.password.value,
      });
      if (!isLoginMode) {
        url = "/users/register";
        body = JSON.stringify({
          username: inputs.username.value,
          email: inputs.email.value,
          password: inputs.password.value,
        });
      }

      try {
        const responseData = await sendRequest(url, "POST", body);
        dispatch(
          authAction.login({
            token: responseData.token,
            userId: responseData.userId,
            expiration: null,
          })
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  const switchModeHandler = () => {
    if (isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          username: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          username: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    }
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
              <Input
                id="username"
                type="text"
                placeholder="Username"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
              />
            )}

            <Input
              id="email"
              type="email"
              placeholder="email"
              validators={[VALIDATOR_EMAIL()]}
              onInput={inputHandler}
            />

            <Input
              id="password"
              type="password"
              placeholder="Password"
              validators={[VALIDATOR_MINLENGTH(6)]}
              onInput={inputHandler}
            />

            <div>
              <Button type="submit" disabled={!formState.isValid}>
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
