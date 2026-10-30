import React from 'react';

export default function AboutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card about-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-with-icon">
            <div className="modal-title-icon purple">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </div>
            <div>
              <h3>About StudentSphere</h3>
              <p className="modal-subtitle">Modern Academic Student Management System</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        <div className="modal-body">
          {/* Student Profile Card */}
          <div className="about-student-card">
            <div className="about-avatar-large">
              <span>PL</span>
            </div>
            <div className="about-student-info">
              <h4>Prachi Lohkare</h4>
              <p className="about-prn">PRN: <strong>202401040083</strong></p>
              <div className="about-badge-row">
                <span className="badge-academic">MIT Academy of Engineering</span>
                <span className="badge-academic-subtle">Computer Engineering</span>
              </div>
            </div>
          </div>

          {/* Academic Laboratory Details */}
          <div className="about-info-grid">
            <div className="about-info-item">
              <span className="info-label">Course / Laboratory</span>
              <span className="info-val">Web Technology Laboratory (2304362L)</span>
            </div>
            <div className="about-info-item">
              <span className="info-label">Assignment</span>
              <span className="info-val">Assignment 7 — MERN Stack REST Architecture</span>
            </div>
            <div className="about-info-item">
              <span className="info-label">Frontend Framework</span>
              <span className="info-val">React 18 + Vite (Modern Academic Dashboard)</span>
            </div>
            <div className="about-info-item">
              <span className="info-label">Backend & ODM</span>
              <span className="info-val">Node.js, Express.js REST API & Mongoose 8.x</span>
            </div>
            <div className="about-info-item">
              <span className="info-label">Database Tier</span>
              <span className="info-val">MongoDB Atlas Cloud (Collection: <code>students</code>)</span>
            </div>
            <div className="about-info-item">
              <span className="info-label">API Communication</span>
              <span className="info-val">Asynchronous Native Fetch API with JSON Payloads</span>
            </div>
          </div>

          <div className="about-features-box">
            <h5>Core Capabilities:</h5>
            <ul>
              <li><strong>CRUD Engine:</strong> Complete Create, Read, Update, Delete with database atomicity.</li>
              <li><strong>Validation:</strong> Dual-layer client-side & Mongoose schema constraint validation.</li>
              <li><strong>Duplicate PRN Prevention:</strong> Unique B-Tree database indexing with HTTP 409 handling.</li>
              <li><strong>Live Queries:</strong> Case-insensitive regex search, multi-field filtering, sorting & pagination.</li>
            </ul>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-modal-primary" onClick={onClose}>
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}
