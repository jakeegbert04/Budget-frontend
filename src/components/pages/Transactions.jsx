import { useState } from "react";

import TransactionsModal from "../modals/TransactionsModal";
import Table from "../table/Table";
import usePageFetch from "../../hooks/usePageFetch";
import useTableControls from "../../hooks/useTableControls";

const columns = [
  {
    key: "description",
    label: "Description",
    sortable: true,
  },
  {
    key: "date",
    label: "Date",
    sortable: true,
  },
  {
    key: "account.name",
    label: "Account Name",
    sortable: true,
  },
  {
    key: "category.name",
    label: "Category Name",
    sortable: true,
  },
  {
    key: "amount",
    label: "Amount",
    sortable: true,
    class: "",
  },
];

const Transactions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, setData } = usePageFetch("transactions");

  const {
    searchTerm,
    setSearchTerm,
    sortConfig,
    handleSort,
    visibleData: visibleTransactions,
  } = useTableControls(data?.results, {
    searchKeys: [
      "description",
      "date",
      "account.name",
      "category.name",
      "amount",
    ],
  });

  const handleModalChange = (value = true) => {
    setIsModalOpen(value);
  };

  return (
    <div className="page-container transactions-container">
      <div className="table-container">
        <div className="title-wrapper">
          <h1>Transactions</h1>

          <div className="table-actions">
            <input
              type="search"
              className="table-search"
              placeholder="Search transactions"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <button className="blue-btn" onClick={() => handleModalChange()}>
              Add
            </button>
          </div>
        </div>

        <Table
          data={visibleTransactions}
          columns={columns}
          onSort={handleSort}
          sortConfig={sortConfig}
        />
      </div>

      <TransactionsModal
        isModalOpen={isModalOpen}
        setIsModalOpen={handleModalChange}
        setData={setData}
      />
    </div>
  );
};

export default Transactions;
