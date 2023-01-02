import { useState, useCallback, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

const BACKEND_MAIN_URL = "http://localhost:5000/api";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const token = useSelector((state) => state.auth.token);
  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, includeToken = false) => {
      setIsLoading(true);

      let headers = {};
      if (body !== null) {
        headers = { "Content-Type": "application/json" };
        try {
          if (body.has("image")) headers = {};
        } catch (err) {}
      }

      if (includeToken)
        headers = { ...headers, Authorization: "Bearer " + token };

      const httpAbortController = new AbortController();
      activeHttpRequests.current.push(httpAbortController);

      try {
        const response = await fetch(BACKEND_MAIN_URL + url, {
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

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortController) =>
        abortController.abort()
      );
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
