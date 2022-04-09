import React, { useState, useCallback } from "react";

const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (url, method = "GET", headers = {}, body = null) => {
      setIsLoading(true);
      try {
        const response = await fetch(url, {
          method,
          headers,
          body: body,
        });
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setIsLoading(false);

        return responseData;
      } catch (err) {
        setIsLoading(false);
        setError(err.message);

        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  return [isLoading, error, sendRequest, clearError];
};

export { useHttpClient };
