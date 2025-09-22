import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";

import Modal from "./Modal";

const AccountsModal = ({ isModalOpen, setIsModalOpen }) => {
  const [categoryData, setCategoryData] = useState({
    name: "",
    amount: 0,
    color: "",
    start_date: "",
    end_date: "",
  });

  const { userInfo } = useContext(AuthContext);
  const { loading, fetchData } = useFetch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAccountData((prevState) => ({
      ...prevState,
      [name]: name === "balance" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    console.log(accountData);
    e.preventDefault();
    await fetchData("account/add", {
      method: "POST",
      body: { ...accountData, user_id: userInfo.user_id },
    });
    setIsModalOpen(false);
  };

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
            value={accountData.name}
            onChange={handleChange}
            required
          />

          <select
            name="account_type"
            value={accountData.account_type}
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
            value={accountData.balance}
            onChange={handleChange}
            required
          />
        </div>

        <button className="blue-btn" type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Account"}
        </button>
      </form>
    </Modal>
  );
};

export default AccountsModal;
