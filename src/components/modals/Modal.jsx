import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

const Modal = (props) => {
  const { isModalOpen, onRequestClose, children, contentClass, overlayClass } =
    props;

  return (
    <ReactModal
      isOpen={isModalOpen}
      onRequestClose={onRequestClose}
      className={`modal-content ${contentClass}`}
      overlayClassName={`modal-overlay ${overlayClass}`}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
