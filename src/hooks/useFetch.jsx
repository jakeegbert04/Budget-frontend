import { useState, useCallback } from "react";

const useFetch = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback((url, options = {}) => {
    const abortController = new AbortController();

    setLoading(true);
    setError(null);

    return new Promise((resolve, reject) => {
      fetch(`http://localhost:8089/${url}`, {
        method: options.method || "GET",
        headers: options.headers || { "Content-Type": "application/json" },
        body: options.body ? JSON.stringify(options.body) : null,
        signal: abortController.signal,
        credentials: options.credentials || "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((json) => {
          setData(json);
          resolve(json);
        })
        .catch((error) => {
          if (error.name !== "AbortError") {
            setError(error);
            reject(error);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    });
  }, []);

  return { data, setData, error, loading, setLoading, fetchData };
};

export default useFetch;
