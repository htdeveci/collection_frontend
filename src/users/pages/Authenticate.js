import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";

import classes from "./Authenticate.module.css";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { authAction } from "../../shared/store/auth";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import Input from "../../shared/components/FormElements/Input";
import { Box, FormControl } from "@mui/material";

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
      {/* <Modal
        show={!!error}
        onCancel={clearError}
        header="An Error Occurred!"
        footer={<Button onClick={clearError}>Okay</Button>}
      >
        <p>{error}</p>
      </Modal> */}

      <Box className={classes.formContainer}>
        <Card sx={{ width: 350 }}>
          <CardHeader
            style={{ textAlign: "center" }}
            title={isLoginMode ? "Login" : "Register"}
          />

          <CardContent>
            <form
              onSubmit={formSubmitHandler}
              className={classes.cardContentAndAction}
            >
              {!isLoginMode && (
                <Input
                  id="username"
                  type="text"
                  label="Username"
                  validators={[VALIDATOR_REQUIRE()]}
                  onInput={inputHandler}
                  helperText="Username can not be empty."
                />
              )}
              <Input
                id="email"
                type="email"
                label="E-mail"
                validators={[VALIDATOR_EMAIL()]}
                onInput={inputHandler}
                helperText="It should be a valid e-mail address."
              />
              <Input
                id="password"
                type="password"
                label="Password"
                validators={[VALIDATOR_MINLENGTH(6)]}
                onInput={inputHandler}
                helperText="Password can be mininum 6 characters length."
              />

              <Button
                type="submit"
                disabled={!formState.isValid}
                variant="contained"
                onClick={formSubmitHandler}
                size="large"
                // sx={{ lineHeight: "3.143em" }}
              >
                {isLoginMode ? "LOGIN" : "REGISTER"}
              </Button>
            </form>
          </CardContent>

          <CardActions className={classes.cardContentAndAction}>
            <Button onClick={switchModeHandler} color="secondary" size="small">
              SWITCH TO {isLoginMode ? "REGISTER" : "LOGIN"}
            </Button>
          </CardActions>
        </Card>
      </Box>
    </>
  );
};

export default Login;
