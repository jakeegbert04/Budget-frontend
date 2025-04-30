import { useState, useCallback } from "react";

const useFetch = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback((url, options = {}) => {
    const abortController = new AbortController();

    setLoading(true);
    setError(null);

    console.log(url);

    // Return a promise to allow chaining .then, .catch, and .finally
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
          resolve(json); // Resolve the promise with the data
        })
        .catch((error) => {
          if (error.name !== "AbortError") {
            setError(error);
            reject(error); // Reject the promise with the error
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
