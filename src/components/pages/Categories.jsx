import { useState } from "react";

import CategoriesModal from "../modals/CategoriesModal";
import Table from "../table/table";
import usePageFetch from "../../hooks/usePageFetch";

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

const Categories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loading, data } = usePageFetch("categories");

  const handleModalChange = (value = true) => {
    setIsModalOpen(value);
  };

  return (
    <div className="page-container categories-container">
      <div className="table-container">
        <div className="title-wrapper">
          <h1>Categories</h1>
          <button className="blue-btn" onClick={() => handleModalChange()}>
            Add Category
          </button>
        </div>
        <Table data={data?.results} columns={columns} />
      </div>
      <CategoriesModal
        isModalOpen={isModalOpen}
        setIsModalOpen={handleModalChange}
      />
    </div>
  );
};

export default Categories;
