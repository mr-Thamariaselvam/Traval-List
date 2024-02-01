// Modal.js
import React from "react";
import "./model.css";

const Model = ({ isOpen, onConfirm, onCancel, children, isAlert }) => {
  return isOpen ? (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <p>{children}</p>
        {isAlert ? (
          <button onClick={onConfirm} className="btn-delete">
            OK
          </button>
        ) : (
          <>
            <button onClick={onConfirm} className="btn-delete">
              OK
            </button>
            <button onClick={onCancel} className="btn-cancel">
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  ) : null;
};

export default Model;
