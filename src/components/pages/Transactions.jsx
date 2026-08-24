import { useState } from "react";
import usePageFetch from "../../hooks/usePageFetch";

import TransactionsTable from "../table/TransactionsTable";
import TransactionsModal from "../modals/TransactionsModal";
const Transactions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, setData } = usePageFetch("transactions");

  return (
    <div className="page-container transactions-container">
      <div className="table-container">
        <div className="title-wrapper">
          <h1>Transactions</h1>
          <button className="blue-btn" onClick={() => setIsModalOpen(true)}>
            Add
          </button>
        </div>

        <TransactionsTable transactions={data?.results} />
      </div>

      <TransactionsModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setData={setData}
      />
    </div>
  );
};

export default Transactions;
