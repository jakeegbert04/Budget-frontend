import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Dropdown from "../custom-components/Dropdown";
import Modal from "./Modal";
import useModalForm from "../../hooks/useModalForm";

import { useInfo } from "../../context/InfoContext";

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

const TransactionsModal = ({ isModalOpen, setIsModalOpen, setData }) => {
  const { accounts, categories } = useInfo();

  const { formData, setFormData, handleChange, handleSubmit, loading, error } =
    useModalForm({
      initialState,
      endpoint: "transaction",
      onSuccess: (newTransaction) => {
        setIsModalOpen(false);
        setData((prev) => ({
          ...prev,
          results: prev?.results
            ? [newTransaction.results, ...prev.results]
            : [newTransaction.results],
        }));
      },
      validate: (data) => data.date && data.amount !== "",
    });

  const accountOptions = accounts?.map((acc) => ({
    value: acc.account_id,
    label: acc.name,
  }));

  const categoriesOptions = categories?.map((cat) => ({
    value: cat.category_id,
    label: cat.name,
  }));

  const handleformChange = (option, type = "account_id") => {
    setFormData((prev) => ({
      ...prev,
      [type]: option ? option.value : "",
    }));
  };

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
          <Dropdown
            isSearchable
            placeHolder="Select account"
            options={accountOptions}
            onChange={(value) => handleformChange(value)}
          />

          <Dropdown
            isSearchable
            placeHolder="Select Category"
            options={categoriesOptions}
            onChange={(value) => handleformChange(value, "category_id")}
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
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          <div className="input-wrapper">
            <label htmlFor="date">date</label>
            <input
              id="date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="start-date">Start Date</label>
            <input
              id="start-date"
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="end-date">End Date</label>
            <input
              id="end-date"
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
            />
          </div>

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
