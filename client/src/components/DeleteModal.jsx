import React from 'react';

export default function DeleteModal({ student, onConfirm, onCancel, deleting }) {
  if (!student) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-card delete-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-with-icon">
            <div className="modal-title-icon danger">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>
            <div>
              <h3>Confirm Student Deletion</h3>
              <p className="modal-subtitle">Permanent database removal</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onCancel} aria-label="Close modal">
            ✕
          </button>
        </div>

        <div className="modal-body">
          <p className="modal-warning-lead">
            Are you sure you want to permanently delete this student record from the database?
          </p>

          <div className="delete-target-summary">
            <div className="delete-student-avatar">
              <span>{student.name ? student.name.charAt(0).toUpperCase() : 'S'}</span>
            </div>
            <div className="delete-student-info">
              <span className="delete-student-name">{student.name}</span>
              <span className="delete-student-prn">PRN: <strong>{student.prn}</strong></span>
              <span className="delete-student-dept">{student.department} • {student.year}</span>
            </div>
          </div>

          <p className="delete-irreversible-note">
            ⚠️ <strong>Warning:</strong> This operation deletes the document permanently from MongoDB Atlas. All associated records will be lost and cannot be recovered.
          </p>
        </div>

        <div className="modal-footer">
          <button className="btn-modal-cancel" onClick={onCancel} disabled={deleting}>
            Cancel
          </button>
          <button className="btn-modal-danger" onClick={onConfirm} disabled={deleting}>
            {deleting ? 'Removing from MongoDB...' : 'Yes, Delete Student'}
          </button>
        </div>
      </div>
    </div>
  );
}
