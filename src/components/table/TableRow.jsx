const TableRow = ({ data, columns }) => {
  return (
    <tr>
      {columns.map((column) => (
        <td key={column.key}>{data[column.key]}</td>
      ))}
    </tr>
  );
};

export default TableRow;
