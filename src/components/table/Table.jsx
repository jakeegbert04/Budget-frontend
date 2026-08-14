import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

const Table = ({ data, columns, onSort, sortConfig }) => {
  return (
    <table className="table-wrapper">
      <TableHeader columns={columns} onSort={onSort} sortConfig={sortConfig} />
      <tbody>
        {data?.map((row, idx) => (
          <TableRow key={idx} data={row} columns={columns} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
