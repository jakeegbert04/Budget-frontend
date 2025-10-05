import { createContext, useContext, useEffect, useState } from "react";
import usePageFetch from "../hooks/usePageFetch";

const InfoContext = createContext();

export default function InfoProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);

  const { data: accountData } = usePageFetch("accounts");
  const { data } = usePageFetch("categories");

  useEffect(() => {
    setAccounts(accountData?.results);
  }, [accountData]);

  useEffect(() => {
    setCategories(data?.results);
  }, [data]);

  const infoState = {
    accounts,
    categories,
    setCategories,
    setAccounts,
  };

  return (
    <InfoContext.Provider value={infoState}>{children}</InfoContext.Provider>
  );
}

export const useInfo = () => {
  return useContext(InfoContext);
};
