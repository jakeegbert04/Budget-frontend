import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Modal from "./Modal";
import useModalForm from "../../hooks/useModalForm";

const initialState = {
  account_id: "",
  category_id: "",
  description: "",
  amount: 0,
  date: "",
  start_date: "",
  end_date: "",
  frequency: "",
};

const TransactionsModal = ({ isModalOpen, setIsModalOpen }) => {
  const { formData, setFormData, handleChange, handleSubmit, loading, error } =
    useModalForm({
      initialState,
      endpoint: "transaction/add",
      onSuccess: () => setIsModalOpen(false),
      validate: (data) => data.date && data.amount !== "",
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
        <h1>Add Transaction</h1>
        <div className="inputs-wrapper">
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          <input
            type="date"
            name="date"
            value={formData.date}
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

          <input
            type="checkbox"
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
          />

          <input
            type="checkbox"
            name="indefinitely"
            value={formData.indefinitely}
            onChange={handleChange}
          />
        </div>

        {error && <div className="error-message">{error}</div>}
        <button
          className="blue-btn"
          type="submit"
          disabled={loading || !formData.description}
        >
          {loading ? "Adding..." : "Add Category"}
        </button>
      </form>
    </Modal>
  );
};

export default TransactionsModal;
