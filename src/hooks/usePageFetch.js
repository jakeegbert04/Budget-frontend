import { useEffect } from "react";
import useFetch from "./useFetch";

const usePageFetch = (endpoint) => {
  const { loading, data, fetchData, setData } = useFetch();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        await fetchData(endpoint);
      } catch (error) {
        console.error("failed to fetch page data");
      }
    };
    fetchAll();
  }, [endpoint]);

  return { loading, data, fetchData, setData };
};

export default usePageFetch;
