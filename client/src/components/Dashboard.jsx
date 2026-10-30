import React, { useEffect, useState } from 'react';
import { getStudentStats } from '../services/api';

export default function Dashboard({ setActiveTab, onEditStudent, onViewStudent }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getStudentStats();
      if (res.success) {
        setStats(res.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to load dashboard statistics from backend');
    } finally {
      setLoading(false);
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

  if (loading) {
    return (
      <div className="dashboard-loading-box">
        <div className="academic-spinner"></div>
        <p className="loading-text">Loading Academic Dashboard analytics from MongoDB Atlas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="academic-card error-card">
        <div className="error-icon-box">⚠️</div>
        <h3>Database Connection Notice</h3>
        <p>{error}</p>
        <button className="btn-primary-purple" onClick={fetchStats}>
          Retry Query
        </button>
      </div>
    );
  }

  const total = stats?.totalStudents || 0;
  const deptList = stats?.deptStats || [];
  const yearList = stats?.yearStats || [];
  const recentList = stats?.recentStudents || [];

  return (
    <div className="dashboard-container">
      {/* Welcome Hero Banner */}
      <div className="dashboard-hero-banner">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-pulse"></span>
            Academic Management Console • AY 2026–27
          </div>
          <h2 className="hero-title">Welcome back, Prachi Lohkare</h2>
          <p className="hero-subtitle">
            StudentSphere Academic Portal • Managing <strong>{total}</strong> active enrolled student records with real-time MongoDB queries.
          </p>
        </div>
        <div className="hero-actions">
          <button className="btn-hero-secondary" onClick={() => setActiveTab('students')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
            Student Directory
          </button>
          <button className="btn-hero-primary" onClick={() => setActiveTab('add')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            New Enrollment
          </button>
        </div>
      </div>

      {/* Redesigned 4 KPI Cards Grid */}
      <div className="kpi-grid">
        {/* KPI 1: Total Students */}
        <div className="kpi-card purple-glow">
          <div className="kpi-top">
            <span className="kpi-label">TOTAL STUDENTS</span>
            <div className="kpi-icon-bubble purple">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
          </div>
          <div className="kpi-number">{total}</div>
          <div className="kpi-footer-text">
            <span className="trend-badge positive">✓ Active</span>
            <span className="kpi-detail">Registered in database</span>
          </div>
        </div>

        {/* KPI 2: Departments */}
        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">DEPARTMENTS</span>
            <div className="kpi-icon-bubble violet">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 21h18M3 7v14M21 7v14M6 11h2M6 15h2M10 11h2M10 15h2M14 11h2M14 15h2M18 11h2M18 15h2M9 3l3-2 3 2"></path>
              </svg>
            </div>
          </div>
          <div className="kpi-number">{deptList.length}</div>
          <div className="kpi-footer-text">
            <span className="kpi-detail">Academic engineering streams</span>
          </div>
        </div>

        {/* KPI 3: Year Cohorts */}
        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">YEAR COHORTS</span>
            <div className="kpi-icon-bubble lavender">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
            </div>
          </div>
          <div className="kpi-number">{yearList.length}</div>
          <div className="kpi-footer-text">
            <span className="kpi-detail">First to Final Year classes</span>
          </div>
        </div>

        {/* KPI 4: MongoDB Atlas Live */}
        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">DATABASE CLUSTER</span>
            <div className="kpi-icon-bubble emerald">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
              </svg>
            </div>
          </div>
          <div className="kpi-status-row">
            <span className="status-live-dot"></span>
            <span className="kpi-status-text">Connected</span>
          </div>
          <div className="kpi-footer-text">
            <span className="kpi-detail">Collection: <code>students</code></span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Analytics Layout */}
      <div className="dashboard-grid-layout">
        {/* Left Column: Analytics Breakdown */}
        <div className="dashboard-col-left">
          {/* Departmental Distribution Card */}
          <div className="academic-card">
            <div className="card-header-styled">
              <div className="card-title-group">
                <h3>Departmental Distribution</h3>
                <p>Enrolled student representation per academic department</p>
              </div>
              <span className="badge-count-pill">{deptList.length} Streams</span>
            </div>
            <div className="card-body">
              {deptList.length === 0 ? (
                <div className="empty-subtle">No department data recorded yet.</div>
              ) : (
                <div className="dept-distribution-list">
                  {deptList.map((dept) => {
                    const pct = total > 0 ? Math.round((dept.count / total) * 100) : 0;
                    return (
                      <div key={dept._id} className="dept-progress-item">
                        <div className="dept-progress-labels">
                          <span className="dept-name">{dept._id}</span>
                          <span className="dept-numbers">
                            <strong>{dept.count}</strong> students ({pct}%)
                          </span>
                        </div>
                        <div className="progress-bar-track">
                          <div
                            className="progress-bar-fill"
                            style={{ width: `${pct}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Academic Year Cohorts Card */}
          <div className="academic-card" style={{ marginTop: '1.5rem' }}>
            <div className="card-header-styled">
              <div className="card-title-group">
                <h3>Academic Year Breakdown</h3>
                <p>Enrollment distribution by academic seniority</p>
              </div>
            </div>
            <div className="card-body">
              <div className="year-cohorts-grid">
                {['First Year', 'Second Year', 'Third Year', 'Final Year'].map((yName) => {
                  const match = yearList.find((item) => item._id === yName);
                  const count = match ? match.count : 0;
                  return (
                    <div key={yName} className="year-cohort-box">
                      <span className="year-cohort-title">{yName}</span>
                      <span className="year-cohort-count">{count}</span>
                      <span className="year-cohort-sub">Students</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Quick Add + Recent Students */}
        <div className="dashboard-col-right">
          {/* Quick Add Action Card */}
          <div className="academic-card quick-enroll-card">
            <div className="quick-enroll-body">
              <div className="quick-enroll-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <line x1="20" y1="8" x2="20" y2="14"></line>
                  <line x1="23" y1="11" x2="17" y2="11"></line>
                </svg>
              </div>
              <div className="quick-enroll-text-block">
                <h4>Enroll a New Student</h4>
                <p>Register new student credentials, PRN, branch, and contact information into MongoDB.</p>
              </div>
              <button className="btn-primary-purple" onClick={() => setActiveTab('add')}>
                + Open Registration Form
              </button>
            </div>
          </div>

          {/* Recently Added Students Section */}
          <div className="academic-card" style={{ marginTop: '1.5rem' }}>
            <div className="card-header-styled">
              <div className="card-title-group">
                <h3>Recently Added Students</h3>
                <p>Latest enrollments in the database</p>
              </div>
              <button className="btn-link-sm" onClick={() => setActiveTab('students')}>
                View All →
              </button>
            </div>
            <div className="card-body recent-students-body">
              {recentList.length === 0 ? (
                <div className="empty-subtle">No student enrollments yet.</div>
              ) : (
                <div className="recent-students-list">
                  {recentList.map((st) => (
                    <div key={st._id} className="recent-student-row">
                      <div className="recent-avatar">
                        <span>{getInitials(st.name)}</span>
                      </div>
                      <div className="recent-info">
                        <span className="recent-name">{st.name}</span>
                        <span className="recent-sub">
                          PRN: <strong>{st.prn}</strong> • {st.department}
                        </span>
                      </div>
                      <div className="recent-actions">
                        {onViewStudent && (
                          <button
                            className="btn-icon-soft"
                            title="View student profile"
                            onClick={() => onViewStudent(st)}
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                          </button>
                        )}
                        {onEditStudent && (
                          <button
                            className="btn-icon-soft"
                            title="Edit student"
                            onClick={() => onEditStudent(st)}
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
