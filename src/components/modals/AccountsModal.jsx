import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Modal from "./Modal";

const AccountsModal = ({ isModalOpen, setIsModalOpen }) => {
  return (
    <Modal
      isModalOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
      contentClass="create-account-modal"
      overlayClass="account-overlay"
    >
      <div className="create-container account-modal-container">
        <FontAwesomeIcon
          onClick={() => setIsModalOpen(false)}
          icon="fa-xmark"
        />
        <h1>Add Account</h1>

        <div className="inputs-wrapper">
          <input type="text" placeholder="Name" name="" />

          <select name="" id="">
            <option value="">Money Type</option>
            <option value="debit">Debit</option>
            <option value="credit">Credit</option>
            <option value="savings">Savings</option>
            <option value="cash">Cash</option>
          </select>

          <input type="number" placeholder="Current Balance" />
        </div>

        <button className="blue-btn">Add Account</button>
      </div>
    </Modal>
  );
};

export default AccountsModal;
