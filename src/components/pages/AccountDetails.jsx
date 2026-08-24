import { useMemo } from "react";
import { useParams } from "react-router-dom";

import TransactionsTable from "../table/TransactionsTable";
import usePageFetch from "../../hooks/usePageFetch";

const AccountDetails = () => {
  const { accountId } = useParams();
  const { data } = usePageFetch("transactions");

  const account = useMemo(
    () =>
      data?.results?.find((t) => t.account.account_id === accountId)?.account,
    [data?.results, accountId]
  );

  const accountTransactions = useMemo(() => {
    const source = Array.isArray(data?.results) ? data.results : [];
    return source.filter((t) => t.account.account_id === accountId);
  }, [data?.results, accountId]);

  return (
    <div className="page-container transactions-container">
      <div className="table-container">
        <div className="title-wrapper">
          <h1>{account?.name ?? "Account"}</h1>
          {/* room here for balance, account type, edit/delete — none of that
              belongs in TransactionsTable, and now it doesn't have to */}
        </div>

        <TransactionsTable
          transactions={accountTransactions}
          showAccountColumn={false}
          searchPlaceholder="Search this account's transactions"
        />
      </div>
    </div>
  );
};

export default AccountDetails;
