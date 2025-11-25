import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Modal from "./Modal";
import useModalForm from "../../hooks/useModalForm";

const initialState = {
  name: "",
  amount: 0,
  color: "",
  start_date: "",
  end_date: "",
};

const CategoriesModal = ({ isModalOpen, setIsModalOpen, setData }) => {
  const { formData, setFormData, handleChange, handleSubmit, loading, error } =
    useModalForm({
      initialState,
      endpoint: "category",
      onSuccess: (newCategory) => {
        setIsModalOpen(false);
        setData((prev) => [...prev, newCategory.results]);
      },
      validate: (data) => data.name && data.amount !== "",
    });

  useEffect(() => {
    if (!isModalOpen) setFormData(initialState);
  }, [isModalOpen, setFormData]);

  return (
    <Modal
      isModalOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
      contentClass="create-account-modal"
      overlayClass="account-overlay"
    >
      <form
        className="create-container account-modal-container"
        onSubmit={handleSubmit}
      >
        <FontAwesomeIcon
          onClick={() => setIsModalOpen(false)}
          icon="fa-xmark"
        />
        <h1>Add Category</h1>
        <div className="inputs-wrapper">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
          <input
            type="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
          />
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
          />
          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button
          className="blue-btn"
          type="submit"
          disabled={loading || !formData.name}
        >
          {loading ? "Adding..." : "Add Category"}
        </button>
      </form>
    </Modal>
  );
};

export default CategoriesModal;
