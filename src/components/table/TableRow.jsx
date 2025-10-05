const TableRow = ({ data, columns }) => {
  const getValue = (obj, path) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  };

  return (
    <tr>
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
