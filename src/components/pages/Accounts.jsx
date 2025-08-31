import { useState, useEffect } from "react";

import Table from "../table/table";
import useFetch from "../../hooks/useFetch";

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const { loading, data, setData, fetchData } = useFetch();

  const columns = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "account_type",
      label: "Type",
    },
    {
      key: "balance",
      label: "Balance",
    },
  ];

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        await fetchData("accounts");
      } catch (error) {
        console.error("Error fetching accounts data:", error);
      }
    };
    fetchAccounts();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="accounts-container">
      <div className="title-wrapper">
        <h1>Accounts</h1>
        <button>Add Account</button>
      </div>
      <Table data={data?.results} columns={columns} />
    </div>
  );
};

export default Accounts;
