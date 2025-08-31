import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

const Table = ({ data, columns }) => {
  return (
    <table>
      <TableHeader columns={columns} />
      <tbody>
        {data?.map((row, idx) => (
          <TableRow key={idx} data={row} columns={columns} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
