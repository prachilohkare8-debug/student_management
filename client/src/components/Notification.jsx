import React, { useEffect } from 'react';

export default function Notification({ notification, onClose }) {
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        onClose();
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [notification, onClose]);

  if (!notification) return null;

  const isSuccess = notification.type === 'success';

  return (
    <div className="toast-portal-wrapper">
      <div className={`academic-toast ${isSuccess ? 'toast-success' : 'toast-error'}`}>
        <div className="toast-icon">
          {isSuccess ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          )}
        </div>
        <div className="toast-content">
          <div className="toast-title">{isSuccess ? 'Operation Successful' : 'Notice / Error'}</div>
          <div className="toast-message">{notification.message}</div>
        </div>
        <button className="toast-dismiss-btn" onClick={onClose} aria-label="Dismiss">
          ✕
        </button>
      </div>
    </div>
  );
}
