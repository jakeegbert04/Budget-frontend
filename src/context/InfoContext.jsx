import { createContext, useContext, useEffect, useState } from "react";
import usePageFetch from "../hooks/usePageFetch";

const InfoContext = createContext();

export default function InfoProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  // const [accountPagination, setAccountPagination] = useState(null);

  const { data: accountData } = usePageFetch(
    `accounts?page=${page}&per_page=${limit}`
  );
  const { data } = usePageFetch("categories");

  useEffect(() => {
    setAccounts(accountData?.results || []);
    // setAccountPagination(accountData?.pagination || null);
  }, [accountData]);

  useEffect(() => {
    setCategories(data?.results || []);
  }, [data]);

  const infoState = {
    accounts,
    categories,
    setCategories,
    setAccounts,
    page,
    setPage,
    limit,
    setLimit,
    // accountPagination,
  };

  return (
    <InfoContext.Provider value={infoState}>{children}</InfoContext.Provider>
  );
}

export const useInfo = () => {
  return useContext(InfoContext);
};
