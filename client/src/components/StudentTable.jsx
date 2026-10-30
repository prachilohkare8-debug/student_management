import React from 'react';

export default function StudentTable({
  students,
  loading,
  onView,
  onEdit,
  onDeleteRequest,
  onClearFilters,
}) {
  const getInitials = (name) => {
    if (!name) return 'ST';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  if (loading) {
    return (
      <div className="table-card-container">
        <div className="table-loading-box">
          <div className="academic-spinner"></div>
          <p>Querying student records from MongoDB Atlas...</p>
        </div>
      </div>
    );
  }

  if (!students || students.length === 0) {
    return (
      <div className="table-card-container">
        <div className="table-empty-box">
          <div className="empty-illustration">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
          </div>
          <h4>No Student Records Found</h4>
          <p>No student documents matched your current search keywords or filters.</p>
          {onClearFilters && (
            <button className="btn-primary-purple btn-sm" onClick={onClearFilters}>
              Reset Search & Filters
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="table-card-container">
      <div className="modern-table-responsive">
        <table className="student-records-table">
          <thead>
            <tr>
              <th style={{ width: '280px' }}>Student Profile</th>
              <th style={{ width: '150px' }}>PRN</th>
              <th>Department</th>
              <th style={{ width: '130px' }}>Year</th>
              <th style={{ width: '140px' }}>Mobile</th>
              <th style={{ textAlign: 'center', width: '130px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id} className="student-data-row">
                {/* Student Profile (Avatar + Name + Email) */}
                <td>
                  <div className="student-profile-cell">
                    <div className="cell-avatar">
                      <span>{getInitials(student.name)}</span>
                    </div>
                    <div className="cell-details">
                      <div className="student-cell-name">{student.name}</div>
                      <div className="student-cell-email">{student.email}</div>
                    </div>
                  </div>
                </td>

                {/* PRN Badge */}
                <td>
                  <span className="cell-prn-badge">{student.prn}</span>
                </td>

                {/* Department */}
                <td>
                  <span className="badge-dept-cell">{student.department}</span>
                </td>

                {/* Academic Year */}
                <td>
                  <span className="badge-year-cell">{student.year}</span>
                </td>

                {/* Mobile */}
                <td>
                  <span className="cell-mobile-text">+91 {student.mobile}</span>
                </td>

                {/* Actions: View, Edit, Delete */}
                <td>
                  <div className="table-actions-group">
                    {onView && (
                      <button
                        className="btn-action-icon view"
                        onClick={() => onView(student)}
                        title={`View profile for ${student.name}`}
                        aria-label="View Student"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      </button>
                    )}
                    {onEdit && (
                      <button
                        className="btn-action-icon edit"
                        onClick={() => onEdit(student)}
                        title={`Edit ${student.name}`}
                        aria-label="Edit Student"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                    )}
                    {onDeleteRequest && (
                      <button
                        className="btn-action-icon delete"
                        onClick={() => onDeleteRequest(student)}
                        title={`Delete ${student.name}`}
                        aria-label="Delete Student"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
