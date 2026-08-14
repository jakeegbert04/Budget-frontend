import { useState } from "react";

import CategoriesModal from "../modals/CategoriesModal";
import Table from "../table/Table";
import useTableControls from "../../hooks/useTableControls";

import { useInfo } from "../../context/InfoContext";

const columns = [
  {
    key: "name",
    label: "Name",
    sortable: true,
  },
  {
    key: "amount",
    label: "Balance",
    sortable: true,
  },
];

const Categories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { categories, setCategories, setPage } = useInfo();

  const {
    searchTerm,
    setSearchTerm,
    sortConfig,
    handleSort,
    visibleData: visibleCategories,
  } = useTableControls(categories, {
    searchKeys: ["name", "amount"],
  });

  const handleModalChange = (value = true) => {
    setIsModalOpen(value);
  };

  return (
    <div className="page-container categories-container">
      <div className="table-container">
        <div className="title-wrapper">
          <h1>Categories</h1>
          <div className="table-actions">
            <input
              type="search"
              className="table-search"
              placeholder="Search Categories"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <button className="blue-btn" onClick={() => handleModalChange()}>
              Add Category
            </button>
          </div>
        </div>
        <Table
          data={visibleCategories}
          columns={columns}
          onSort={handleSort}
          sortConfig={sortConfig}
          onPageChange={(nextPage) => setPage(Math.max(1, nextPage))}
        />
      </div>
      <CategoriesModal
        isModalOpen={isModalOpen}
        setIsModalOpen={handleModalChange}
        setData={setCategories}
      />
    </div>
  );
};

export default Categories;
