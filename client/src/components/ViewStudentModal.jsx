import React from 'react';

export default function ViewStudentModal({ student, onClose, onEdit }) {
  if (!student) return null;

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  const getInitials = (name) => {
    if (!name) return 'ST';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card view-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-with-icon">
            <div className="modal-title-icon purple">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div>
              <h3>Student Profile Details</h3>
              <p className="modal-subtitle">Official Academic Profile Record</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        <div className="modal-body">
          {/* Header Banner */}
          <div className="student-detail-hero">
            <div className="student-detail-avatar">
              <span>{getInitials(student.name)}</span>
            </div>
            <div className="student-detail-meta">
              <h4>{student.name}</h4>
              <div className="student-detail-prn-badge">
                <span>PRN: <strong>{student.prn}</strong></span>
              </div>
              <div className="student-detail-pills">
                <span className="badge-dept-pill">{student.department}</span>
                <span className="badge-year-pill">{student.year}</span>
              </div>
            </div>
          </div>

          {/* Details Table */}
          <div className="student-specs-grid">
            <div className="spec-card">
              <div className="spec-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div className="spec-info">
                <span className="spec-label">Official Email</span>
                <span className="spec-value">{student.email}</span>
              </div>
            </div>

            <div className="spec-card">
              <div className="spec-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div className="spec-info">
                <span className="spec-label">Contact Mobile</span>
                <span className="spec-value mono">+91 {student.mobile}</span>
              </div>
            </div>

            <div className="spec-card">
              <div className="spec-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <div className="spec-info">
                <span className="spec-label">Enrolled Timestamp</span>
                <span className="spec-value">{formatDate(student.createdAt)}</span>
              </div>
            </div>

            <div className="spec-card">
              <div className="spec-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                </svg>
              </div>
              <div className="spec-info">
                <span className="spec-label">MongoDB Document ID</span>
                <span className="spec-value mono small">{student._id}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-modal-cancel" onClick={onClose}>
            Close
          </button>
          <button
            className="btn-modal-primary"
            onClick={() => {
              onClose();
              if (onEdit) onEdit(student);
            }}
          >
            Edit Student Record
          </button>
        </div>
      </div>
    </div>
  );
}
