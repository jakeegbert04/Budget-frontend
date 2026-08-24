const TableRow = ({ data, columns, onRowClick }) => {
  const getValue = (obj, path) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  };

  const isClickable = typeof onRowClick === "function";

  return (
    <tr
      className={isClickable ? "table-row--clickable" : ""}
      onClick={isClickable ? () => onRowClick(data) : undefined}
    >
      {columns.map((column) => {
        const value = getValue(data, column.key);
        let cellClass = "";

        if (column.key === "amount" || column.key === "balance") {
          if (typeof value === "number") {
            cellClass = value < 0 ? "amount-negative" : "amount-positive";
          } else if (!isNaN(Number(value))) {
            cellClass =
              Number(value) < 0 ? "amount-negative" : "amount-positive";
          }
        }

        return (
          <td key={column.key} className={cellClass}>
            {value}
          </td>
        );
      })}
    </tr>
  );
};

export default TableRow;
