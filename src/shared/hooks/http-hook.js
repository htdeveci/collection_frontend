import { useState, useCallback, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const token = useSelector((store) => store.auth.token);
  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, includeToken = true) => {
      setIsLoading(true);
      let headers = {};
      if (body !== null) {
        headers = { "Content-Type": "application/json" };
        try {
          if (body.has("image")) headers = {};
        } catch (err) {}
      }

      if (includeToken && token) {
        headers = {
          ...headers,
          Authorization: "Bearer " + token,
        };
      }

      const httpAbortController = new AbortController();
      activeHttpRequests.current.push(httpAbortController);

      try {
        const response = await fetch(process.env.REACT_APP_API_URL + url, {
          method,
          body,
          headers,
          signal: httpAbortController.signal,
        });

        const responseData = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (requestController) => requestController !== httpAbortController
        );

        if (!response.ok) throw new Error(responseData.message);

        setIsLoading(false);
        return responseData;
      } catch (err) {
        setIsLoading(false);
        setError(err.message);
        throw err;
      }
    },
    [token]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortController) =>
        abortController.abort()
      );
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
