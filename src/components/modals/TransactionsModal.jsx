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
  start_date: null,
  end_date: null,
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
      contentClass="transaction-modal"
      overlayClass="transaction-overlay"
    >
      <form
        className="create-container transaction-modal-container"
        onSubmit={handleSubmit}
      >
        <FontAwesomeIcon
          onClick={() => setIsModalOpen(false)}
          className="close-modal"
          icon="fa-xmark"
        />
        <h1>Add Transaction</h1>
        <div className="inputs-wrapper">
          <Dropdown
            isSearchable
            placeHolder="Select Account"
            options={accountOptions}
            onChange={(value) => handleformChange(value)}
          />

          <Dropdown
            isSearchable
            placeHolder="Select Category"
            options={categoriesOptions}
            onChange={(value) => handleformChange(value, "category_id")}
          />

          <div className="input-wrapper">
            <label>Transaction Amount</label>
            <input
              id="transaction-amount"
              type="number"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="date">Transaction Date</label>
            <input
              id="date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          <input
            className="full-width"
            type="text"
            name="description"
            placeholder="Description (optional)"
            value={formData.description}
            onChange={handleChange}
          />

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

          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="frequency"
              name="frequency"
              checked={formData.frequency}
              onChange={handleChange}
            />
            <label htmlFor="frequency">Recurring</label>
          </div>

          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="indefinitely"
              name="indefinitely"
              checked={formData.indefinitely}
              onChange={handleChange}
            />
            <label htmlFor="indefinitely">Indefinitely</label>
          </div>
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
