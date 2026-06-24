import React from 'react';
import './LoadingSpinner.css';

/**
 * Reusable loading spinner for feature pages.
 *
 * @param {string} message Optional loading message shown below the spinner.
 * @param {string} className Extra className for layout customization.
 */
export default function LoadingSpinner({
  message = 'Loading...',
  className = ''
}) {
  const wrapperClassName = `loading-spinner ${className}`.trim();

  return (
      <div className={wrapperClassName} role="status" aria-live="polite">
        <span className="loading-spinner-icon" aria-hidden="true"></span>
        {message ? <p className="loading-spinner-message">{message}</p> : null}
      </div>
  );
}

