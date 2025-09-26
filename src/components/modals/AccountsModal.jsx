import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useModalForm from "../../hooks/useModalForm";

import Modal from "./Modal";

const initialState = { name: "", account_type: "", balance: 0 };

const AccountsModal = ({ isModalOpen, setIsModalOpen }) => {
  const { formData, setFormData, handleChange, handleSubmit, loading, error } =
    useModalForm({
      initialState,
      endpoint: "account/add",
      onSuccess: () => setIsModalOpen(false),
      validate: (data) => data.name && data.account_type && data.balance !== "",
    });

  useEffect(() => {
    if (!isModalOpen) {
      setFormData(initialState);
    }
  }, [isModalOpen]);

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
        <h1>Add Account</h1>

        <div className="inputs-wrapper">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            autoFocus
            required
          />

          <select
            name="account_type"
            value={formData.account_type}
            onChange={handleChange}
            required
            id=""
          >
            <option value="">Money Type</option>
            <option value="debit">Debit</option>
            <option value="credit">Credit</option>
            <option value="savings">Savings</option>
            <option value="cash">Cash</option>
          </select>

          <input
            type="number"
            name="balance"
            placeholder="Current Balance"
            value={formData.balance}
            onChange={handleChange}
            required
          />
        </div>

        <button
          className="blue-btn"
          type="submit"
          disabled={loading || !formData.name || !formData.account_type}
        >
          {loading ? "Adding..." : "Add Account"}
        </button>
      </form>
    </Modal>
  );
};

export default AccountsModal;
