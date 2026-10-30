import React, { useState, useEffect } from 'react';
import { createStudent, updateStudent } from '../services/api';

const DEPARTMENTS = [
  'Computer Engineering',
  'Information Technology',
  'Electronics & Telecommunication',
  'Mechanical Engineering',
  'Civil Engineering',
  'Chemical Engineering',
];

const YEARS = [
  'First Year',
  'Second Year',
  'Third Year',
  'Final Year',
];

export default function StudentForm({
  editingStudent,
  onSuccess,
  onCancel,
  showNotification,
}) {
  const isEditing = Boolean(editingStudent);

  const initialFormState = {
    name: '',
    prn: '',
    email: '',
    department: '',
    year: '',
    mobile: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        name: editingStudent.name || '',
        prn: editingStudent.prn || '',
        email: editingStudent.email || '',
        department: editingStudent.department || '',
        year: editingStudent.year || '',
        mobile: editingStudent.mobile || '',
      });
      setErrors({});
    } else {
      setFormData(initialFormState);
      setErrors({});
    }
  }, [editingStudent]);

  // Client-side validation function matching backend Mongoose schema
  const validateField = (fieldName, value) => {
    let error = '';
    const trimmed = typeof value === 'string' ? value.trim() : value;

    switch (fieldName) {
      case 'name':
        if (!trimmed) {
          error = 'Student name is required';
        } else if (trimmed.length < 2) {
          error = 'Name must be at least 2 characters long';
        } else if (!/^[a-zA-Z\s.]+$/.test(trimmed)) {
          error = 'Name should only contain letters and spaces';
        }
        break;

      case 'prn':
        if (!trimmed) {
          error = 'PRN is required';
        } else if (!/^[a-zA-Z0-9]+$/.test(trimmed)) {
          error = 'PRN must contain alphanumeric characters only (no spaces)';
        } else if (trimmed.length < 5 || trimmed.length > 20) {
          error = 'PRN should be between 5 and 20 characters';
        }
        break;

      case 'email':
        if (!trimmed) {
          error = 'Email address is required';
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmed)) {
          error = 'Please provide a valid official email address';
        }
        break;

      case 'department':
        if (!trimmed) {
          error = 'Please select an academic department';
        }
        break;

      case 'year':
        if (!trimmed) {
          error = 'Please select current year of study';
        }
        break;

      case 'mobile':
        if (!trimmed) {
          error = 'Mobile number is required';
        } else if (!/^[6-9]\d{9}$/.test(trimmed)) {
          error = 'Must be a valid 10-digit Indian mobile number (starts 6-9)';
        }
        break;

      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === 'prn' ? value.toUpperCase().trim() : value;

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));

    // Live field validation
    const fieldError = validateField(name, updatedValue);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldError,
    }));
  };

  const validateAll = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const err = validateField(field, formData[field]);
      if (err) newErrors[field] = err;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateAll()) {
      showNotification('Please correct all validation errors before submitting.', 'error');
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        name: formData.name.trim(),
        prn: formData.prn.trim().toUpperCase(),
        email: formData.email.trim().toLowerCase(),
        department: formData.department,
        year: formData.year,
        mobile: formData.mobile.trim(),
      };

      if (isEditing) {
        const res = await updateStudent(editingStudent._id, payload);
        showNotification(res.message || 'Student profile updated successfully in MongoDB!', 'success');
      } else {
        const res = await createStudent(payload);
        showNotification(res.message || 'New student enrolled successfully in MongoDB!', 'success');
      }

      onSuccess();
    } catch (err) {
      const msg = err.message || 'An error occurred during submission';
      showNotification(msg, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="student-form-card">
      <div className="form-card-header">
        <div className="form-header-icon-box">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {isEditing ? (
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            ) : (
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            )}
            <circle cx="9" cy="7" r="4"></circle>
            {!isEditing && (
              <>
                <line x1="20" y1="8" x2="20" y2="14"></line>
                <line x1="23" y1="11" x2="17" y2="11"></line>
              </>
            )}
          </svg>
        </div>
        <div className="form-header-text">
          <h3>{isEditing ? 'Update Student Record' : 'Enroll New Student'}</h3>
          <p>
            {isEditing
              ? `Modifying details for PRN: ${editingStudent.prn}`
              : 'Fill in the official academic details to register into MongoDB Atlas'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="student-form-body" noValidate>
        <div className="form-grid-2col">
          {/* 1. Student Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Full Student Name <span className="req-star">*</span>
            </label>
            <div className="input-with-icon">
              <span className="field-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </span>
              <input
                id="name"
                name="name"
                type="text"
                className={`form-input ${errors.name ? 'input-error' : ''}`}
                placeholder="e.g. Aarav Sharma"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            {errors.name && <span className="field-error-msg">{errors.name}</span>}
          </div>

          {/* 2. PRN */}
          <div className="form-group">
            <label className="form-label" htmlFor="prn">
              Permanent Registration Number (PRN) <span className="req-star">*</span>
            </label>
            <div className="input-with-icon">
              <span className="field-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                  <line x1="7" y1="8" x2="17" y2="8"></line>
                  <line x1="7" y1="12" x2="13" y2="12"></line>
                </svg>
              </span>
              <input
                id="prn"
                name="prn"
                type="text"
                className={`form-input font-mono ${errors.prn ? 'input-error' : ''}`}
                placeholder="e.g. 202401040001"
                value={formData.prn}
                onChange={handleChange}
              />
            </div>
            {errors.prn && <span className="field-error-msg">{errors.prn}</span>}
          </div>

          {/* 3. Official Email */}
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Official Email Address <span className="req-star">*</span>
            </label>
            <div className="input-with-icon">
              <span className="field-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </span>
              <input
                id="email"
                name="email"
                type="email"
                className={`form-input ${errors.email ? 'input-error' : ''}`}
                placeholder="e.g. student@mitaoe.ac.in"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            {errors.email && <span className="field-error-msg">{errors.email}</span>}
          </div>

          {/* 4. Mobile Number */}
          <div className="form-group">
            <label className="form-label" htmlFor="mobile">
              10-Digit Mobile Number <span className="req-star">*</span>
            </label>
            <div className="input-with-icon">
              <span className="field-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </span>
              <input
                id="mobile"
                name="mobile"
                type="text"
                maxLength="10"
                className={`form-input font-mono ${errors.mobile ? 'input-error' : ''}`}
                placeholder="e.g. 9822012345"
                value={formData.mobile}
                onChange={handleChange}
              />
            </div>
            {errors.mobile && <span className="field-error-msg">{errors.mobile}</span>}
          </div>

          {/* 5. Department */}
          <div className="form-group">
            <label className="form-label" htmlFor="department">
              Engineering Department <span className="req-star">*</span>
            </label>
            <div className="input-with-icon">
              <span className="field-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 21h18M3 7v14M21 7v14M6 11h2M6 15h2M10 11h2M10 15h2M14 11h2M14 15h2M18 11h2M18 15h2M9 3l3-2 3 2"></path>
                </svg>
              </span>
              <select
                id="department"
                name="department"
                className={`form-input form-select ${errors.department ? 'input-error' : ''}`}
                value={formData.department}
                onChange={handleChange}
              >
                <option value="">-- Select Department --</option>
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
            {errors.department && <span className="field-error-msg">{errors.department}</span>}
          </div>

          {/* 6. Academic Year */}
          <div className="form-group">
            <label className="form-label" htmlFor="year">
              Academic Year of Study <span className="req-star">*</span>
            </label>
            <div className="input-with-icon">
              <span className="field-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                </svg>
              </span>
              <select
                id="year"
                name="year"
                className={`form-input form-select ${errors.year ? 'input-error' : ''}`}
                value={formData.year}
                onChange={handleChange}
              >
                <option value="">-- Select Year of Study --</option>
                {YEARS.map((yr) => (
                  <option key={yr} value={yr}>
                    {yr}
                  </option>
                ))}
              </select>
            </div>
            {errors.year && <span className="field-error-msg">{errors.year}</span>}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="form-actions-bar">
          <button
            type="button"
            className="btn-form-cancel"
            onClick={onCancel}
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-form-submit"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <span className="btn-spinner"></span>
                <span>Saving to MongoDB...</span>
              </>
            ) : isEditing ? (
              'Save Updated Record'
            ) : (
              'Enroll Student Record'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
