import { useState } from "react";

import TransactionsModal from "../modals/TransactionsModal";
import Table from "../table/Table";
import usePageFetch from "../../hooks/usePageFetch";

const columns = [
  {
    key: "description",
    label: "Description",
  },
  {
    key: "date",
    label: "Date",
  },
  {
    key: "account.name",
    label: "Acount Name",
  },
  {
    key: "category.name",
    label: "Category Name",
  },
  {
    key: "amount",
    label: "Amount",
    class: "",
  },
];

const Transactions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, setData } = usePageFetch("transactions");

  const handleModalChange = (value = true) => {
    setIsModalOpen(value);
  };

  return (
    <div className="page-container transactions-container">
      <div className="table-container">
        <div className="title-wrapper">
          <h1>Transactions</h1>
          <button className="blue-btn" onClick={() => handleModalChange()}>
            Add
          </button>
        </div>
        <Table data={data?.results} columns={columns} />
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
