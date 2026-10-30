import React from 'react';

const DEPARTMENTS = [
  'All',
  'Computer Engineering',
  'Information Technology',
  'Electronics & Telecommunication',
  'Mechanical Engineering',
  'Civil Engineering',
  'Chemical Engineering',
];

const YEARS = ['All', 'First Year', 'Second Year', 'Third Year', 'Final Year'];

export default function QueryBar({
  search,
  setSearch,
  department,
  setDepartment,
  year,
  setYear,
  sortBy,
  setSortBy,
  order,
  setOrder,
  onReset,
}) {
  const isFiltered =
    search.trim() !== '' ||
    department !== 'All' ||
    year !== 'All' ||
    sortBy !== 'createdAt' ||
    order !== 'desc';

  const toggleSortOrder = () => {
    setOrder(order === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="query-toolbar-card">
      {/* Top Row: Search Input & Clear Filters */}
      <div className="query-top-row">
        <div className="search-box-field">
          <svg
            className="search-field-icon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            className="search-field-input"
            placeholder="Search by student name, PRN, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              className="search-clear-btn"
              onClick={() => setSearch('')}
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {isFiltered && (
          <button className="btn-clear-filters" onClick={onReset}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
            Reset Filters
          </button>
        )}
      </div>

      {/* Filter and Sort Row */}
      <div className="query-bottom-row">
        {/* Department Filter */}
        <div className="filter-item">
          <label className="filter-label">Department:</label>
          <div className="select-wrapper">
            <select
              className="academic-select"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept === 'All' ? 'All Departments' : dept}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Year Filter */}
        <div className="filter-item">
          <label className="filter-label">Academic Year:</label>
          <div className="select-wrapper">
            <select
              className="academic-select"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              {YEARS.map((yr) => (
                <option key={yr} value={yr}>
                  {yr === 'All' ? 'All Years' : yr}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sort By Field */}
        <div className="filter-item">
          <label className="filter-label">Sort By:</label>
          <div className="select-wrapper">
            <select
              className="academic-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="createdAt">Date Enrolled</option>
              <option value="name">Student Name</option>
              <option value="prn">PRN</option>
              <option value="department">Department</option>
            </select>
          </div>
        </div>

        {/* Sort Order Direction Toggle Button */}
        <div className="filter-item sort-direction-item">
          <label className="filter-label">Order:</label>
          <button
            className="btn-sort-toggle"
            onClick={toggleSortOrder}
            title={`Current order: ${order === 'asc' ? 'Ascending' : 'Descending'}. Click to toggle.`}
            type="button"
          >
            {order === 'asc' ? (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="19" x2="12" y2="5"></line>
                  <polyline points="5 12 12 5 19 12"></polyline>
                </svg>
                <span>Ascending (A–Z)</span>
              </>
            ) : (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
                <span>Descending (Z–A)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
