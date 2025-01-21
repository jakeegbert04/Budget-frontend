import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(url, {
        signal: abortController.signal,
      });
      const json = await response.json();
      setData(json);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Request was aborted");
      } else {
        setError(error);
      }
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url]);

  return { data, error };
};
