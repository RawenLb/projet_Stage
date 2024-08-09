import React from 'react';
import '../styles/ConfirmationModal.css'; // Add your custom styles for the modal

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Are you sure?</h2>
                <p>Do you really want to delete this result?</p>
                <div className="modal-buttons">
                    <button onClick={onConfirm} className="btn-confirm">Yes</button>
                    <button onClick={onClose} className="btn-cancel">No</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
