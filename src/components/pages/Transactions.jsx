import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

const Transactions = () => {
  const { loading, data, fetchData } = useFetch();

  return (
    <div>
      <h1>Transactions</h1>
    </div>
  );
};

export default Transactions;
