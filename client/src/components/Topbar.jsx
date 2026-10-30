import React from 'react';

export default function Topbar({
  activeTab,
  setActiveTab,
  onOpenAbout,
  onQuickEnroll,
  searchQuery,
  setSearchQuery,
  isMobileOpen,
  setIsMobileOpen,
}) {
  const getTabLabel = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Academic Dashboard';
      case 'students':
        return 'Student Records Directory';
      case 'add':
        return 'Student Enrollment & Records';
      default:
        return 'Academic Management';
    }
  };

  return (
    <header className="app-topbar">
      <div className="topbar-left">
        {/* Mobile Hamburger Button */}
        <button
          className="topbar-hamburger-btn"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle navigation menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        {/* Context / Breadcrumb */}
        <div className="topbar-context">
          <div className="topbar-context-tag">StudentSphere</div>
          <span className="topbar-context-slash">/</span>
          <span className="topbar-context-page">{getTabLabel()}</span>
        </div>
      </div>

      <div className="topbar-right">
        {/* Quick Search Input */}
        <div className="topbar-search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Quick search student, PRN..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (activeTab !== 'students') {
                setActiveTab('students');
              }
            }}
          />
        </div>

        {/* Quick Enroll Action */}
        <button
          className="btn-quick-enroll"
          onClick={onQuickEnroll}
          title="Enroll new student"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span className="quick-enroll-text">New Student</span>
        </button>

        {/* Student Profile Identity Section: Prachi Lohkare (PRN: 202401040025) */}
        <div
          className="topbar-profile"
          onClick={onOpenAbout}
          title="Click to view Administrator & System Profile"
          role="button"
          tabIndex={0}
        >
          <div className="profile-avatar">
            <span>PL</span>
          </div>
          <div className="profile-info">
            <span className="profile-name">Prachi Lohkare</span>
            <span className="profile-role">PRN: 202401040025</span>
          </div>
          <div className="profile-dropdown-arrow">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}
