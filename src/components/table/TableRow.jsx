const TableRow = ({ data, columns }) => {
  const getValue = (obj, path) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  };

  return (
    <tr>
      {columns.map((column) => (
        <td key={column.key}>{getValue(data, column.key)}</td>
      ))}
    </tr>
  );
};

export default TableRow;
