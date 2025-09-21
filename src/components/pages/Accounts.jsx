import { useState, useEffect } from "react";

import AccountsModal from "../modals/AccountsModal";
import Table from "../table/table";
import useFetch from "../../hooks/useFetch";

const Accounts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loading, data, setData, fetchData } = useFetch();

  const handleModalChange = (value = true) => {
    setIsModalOpen(value);
  };

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

  return (
    <div className="page-container accounts-container">
      <div className="table-container">
        <div className="title-wrapper">
          <h1>Accounts</h1>
          <button className="blue-btn" onClick={() => handleModalChange()}>
            Add Account
          </button>
        </div>
        <Table data={data?.results} columns={columns} />
      </div>
      <AccountsModal
        isModalOpen={isModalOpen}
        setIsModalOpen={handleModalChange}
      />
    </div>
  );
};

export default Accounts;
