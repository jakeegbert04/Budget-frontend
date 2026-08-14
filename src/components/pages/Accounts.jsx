import { useState } from "react";
import AccountsModal from "../modals/AccountsModal";
import Table from "../table/Table";
import { useInfo } from "../../context/InfoContext";
import useTableControls from "../../hooks/useTableControls";

const columns = [
  { key: "name", label: "Name", sortable: true },
  { key: "account_type", label: "Type" },
  { key: "balance", label: "Balance", sortable: true },
];

const Accounts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { accounts, setAccounts, setPage } = useInfo();

  const {
    searchTerm,
    setSearchTerm,
    sortConfig,
    handleSort,
    visibleData: visibleAccounts,
  } = useTableControls(accounts, {
    searchKeys: ["name", "account_type", "balance"],
  });

  return (
    <div className="page-container accounts-container">
      <div className="table-container">
        <div className="title-wrapper">
          <h1>Accounts</h1>

          <div className="table-actions">
            <input
              type="search"
              className="table-search"
              placeholder="Search accounts"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <button className="blue-btn" onClick={() => setIsModalOpen(true)}>
              Add Account
            </button>
          </div>
        </div>

        <Table
          data={visibleAccounts}
          columns={columns}
          onSort={handleSort}
          sortConfig={sortConfig}
          onPageChange={(nextPage) => setPage(Math.max(1, nextPage))}
        />
      </div>

      <AccountsModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setData={setAccounts}
      />
    </div>
  );
};

export default Accounts;
