const TableHeader = ({ columns, onSort, sortConfig }) => {
  const getSortIndicator = (columnKey) => {
    if (!sortConfig || sortConfig.key !== columnKey) return "";
    return sortConfig.direction === "asc" ? " ↑" : " ↓";
  };

  return (
    <thead>
      <tr>
        {columns.map((column) => {
          const isSortable = Boolean(column.sortable);

          return (
            <th
              key={column.key}
              onClick={() => isSortable && onSort(column.key)}
              className={isSortable ? "sortable-header" : ""}
            >
              <span>{column.label}</span>
              {isSortable ? (
                <span className="sort-indicator">
                  {getSortIndicator(column.key)}
                </span>
              ) : null}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHeader;
