import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import Table from "../table/table";

const Categories = () => {
  const { loading, data, fetchData } = useFetch();

  const columns = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "amount",
      label: "Balance",
    },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        await fetchData("categories");
      } catch (error) {
        console.error("Error fetching accounts data:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="page-container categories-container">
      <div className="table-container">
        <div className="title-wrapper">
          <h1>Categories</h1>
          <button className="blue-btn">Add Category</button>
        </div>
        <Table data={data?.results} columns={columns} />
      </div>
    </div>
  );
};

export default Categories;
