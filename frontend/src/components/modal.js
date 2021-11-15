import './modal.css';

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className="container">
      <div className={showHideClassName}>
        <section className="modal-main">
          {children}
          <button type="button" onClick={handleClose} className="modal-close-button">
            Close cart
          </button>
        </section>
      </div>
    </div>
    
  );
};

export default Modal;