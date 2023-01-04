import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { authAction } from "../store/auth";

let logoutTimer;

const useAuth = () => {
  const token = useSelector((state) => state.auth.token);
  const tokenExpirationDate = useSelector((state) => state.auth.expiration);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.token) {
      dispatch(
        authAction.login({ token: storedData.token, userId: storedData.userId })
      );
    }
  }, [dispatch]);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        new Date(tokenExpirationDate).getTime() - new Date().getTime();
      logoutTimer = setTimeout(
        () => dispatch(authAction.logout()),
        remainingTime
      );
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, dispatch, tokenExpirationDate]);

  return { token };
};

export default useAuth;
