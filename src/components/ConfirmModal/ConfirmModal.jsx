import "./ConfirmModal.css";

function ConfirmModal({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
    confirmText = "Delete",
}) {

    if (!isOpen) return null;

    return (

        <div className="confirm-modal-overlay">

            <div className="confirm-modal">

                <h2>{title}</h2>

                <p>{message}</p>

                <div className="confirm-modal-buttons">

                    <button
                        className="cancel-btn"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                    <button
                        className="delete-btn"
                        onClick={onConfirm}
                    >
                        {confirmText || "Delete"}
                    </button>

                </div>

            </div>

        </div>

    );

}

export default ConfirmModal;