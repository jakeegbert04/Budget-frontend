import useTableControls from "../../hooks/useTableControls";
import Table from "../table/Table";
import DateFilter from "../custom-components/DateFilter";

const TransactionsTable = ({
  transactions,
  showAccountColumn = true,
  searchPlaceholder = "Search transactions",
}) => {
  const columns = [
    { key: "description", label: "Description", sortable: true },
    { key: "date", label: "Date", sortable: true },
    ...(showAccountColumn
      ? [{ key: "account.name", label: "Account Name", sortable: true }]
      : []),
    { key: "category.name", label: "Category Name", sortable: true },
    { key: "amount", label: "Amount", sortable: true, class: "" },
  ];

  const searchKeys = [
    "description",
    "date",
    "category.name",
    "amount",
    ...(showAccountColumn ? ["account.name"] : []),
  ];

  const {
    searchTerm,
    setSearchTerm,
    sortConfig,
    handleSort,
    dateRange,
    setStartDate,
    setEndDate,
    clearDateRange,
    visibleData,
  } = useTableControls(transactions, {
    searchKeys,
    dateRangeKey: "date",
  });

  return (
    <>
      <div className="table-actions">
        <input
          type="search"
          className="table-search"
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <DateFilter
          dateRange={dateRange}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          clearDateRange={clearDateRange}
        />
      </div>

      <Table
        data={visibleData}
        columns={columns}
        onSort={handleSort}
        sortConfig={sortConfig}
      />
    </>
  );
};

export default TransactionsTable;
