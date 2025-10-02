import { useState } from "react";

import AccountsModal from "../modals/AccountsModal";
import Table from "../table/table";

import { useInfo } from "../../context/InfoContext";

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

const Accounts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { accounts } = useInfo();

  const handleModalChange = (value = true) => {
    setIsModalOpen(value);
  };

  return (
    <div className="page-container accounts-container">
      <div className="table-container">
        <div className="title-wrapper">
          <h1>Accounts</h1>
          <button className="blue-btn" onClick={() => handleModalChange()}>
            Add Account
          </button>
        </div>
        <Table data={accounts} columns={columns} />
      </div>
      <AccountsModal
        isModalOpen={isModalOpen}
        setIsModalOpen={handleModalChange}
      />
    </div>
  );
};

export default Accounts;
