import { toast } from 'react-toastify';

/**
 * Show success toast notification
 * @param {string} message - Success message to display
 * @param {object} options - Optional toast configuration
 */
export const showSuccessToast = (message, options = {}) => {
  return toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    ...options
  });
};

/**
 * Show error toast notification
 * @param {string} message - Error message to display
 * @param {object} options - Optional toast configuration
 */
export const showErrorToast = (message, options = {}) => {
  return toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    ...options
  });
};

/**
 * Show info toast notification
 * @param {string} message - Info message to display
 * @param {object} options - Optional toast configuration
 */
export const showInfoToast = (message, options = {}) => {
  return toast.info(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    ...options
  });
};

/**
 * Show warning toast notification
 * @param {string} message - Warning message to display
 * @param {object} options - Optional toast configuration
 */
export const showWarningToast = (message, options = {}) => {
  return toast.warning(message, {
    position: "top-right",
    autoClose: 4000, 
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    ...options
  });
}; 