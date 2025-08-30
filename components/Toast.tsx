import React from 'react';

interface ToastProps {
  message: string;
  type: 'info' | 'success' | 'error';
  onClose: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose, action }) => {
  const baseClasses = "flex items-center justify-between w-full max-w-sm p-4 text-neutral-200 rounded-lg shadow-lg";
  const typeClasses = {
    info: 'bg-blue-800 border border-blue-600',
    success: 'bg-green-800 border border-green-600',
    error: 'bg-red-800 border border-red-600',
  };
  const iconName = {
    info: 'info',
    success: 'check_circle',
    error: 'error',
  };

  const handleActionClick = () => {
    if (action) {
      action.onClick();
      onClose();
    }
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type]} animate-fadeIn`} role="alert">
      <div className="flex items-center">
        <span className="material-icons-outlined text-xl">{iconName[type]}</span>
        <div className="ms-3 text-sm font-normal">{message}</div>
        {action && (
          <button onClick={handleActionClick} className="ms-4 text-sm font-semibold text-white underline hover:no-underline">
            {action.label}
          </button>
        )}
      </div>
      <button
        type="button"
        className="ms-auto -mx-1.5 -my-1.5 bg-neutral-700/50 text-neutral-400 hover:text-white hover:bg-neutral-600 rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8"
        onClick={onClose}
        aria-label="Fermer"
      >
        <span className="material-icons-outlined text-lg">close</span>
      </button>
    </div>
  );
};

export default Toast;