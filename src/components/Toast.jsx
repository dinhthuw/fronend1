import React from 'react';
import { ToastContainer as ReactToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showSuccessToast, showErrorToast, showInfoToast, showWarningToast } from '../utils/ToastUtils';

/**
 * Reusable Toast component that can be used to show various toast notifications
 * @param {Object} props - Component props
 * @param {string} props.type - Toast type ('success', 'error', 'info', 'warning')
 * @param {string} props.message - Message to display in the toast
 * @param {Object} props.options - Additional toast configuration options
 * @returns {React.Component} Toast notification
 */
const Toast = ({ type, message, options = {} }) => {
  if (!message) return null;
  
  // Display the toast based on type
  React.useEffect(() => {
    switch (type) {
      case 'success':
        showSuccessToast(message, options);
        break;
      case 'error':
        showErrorToast(message, options);
        break;
      case 'info':
        showInfoToast(message, options);
        break;
      case 'warning':
        showWarningToast(message, options);
        break;
      default:
        showInfoToast(message, options);
    }
  }, [type, message, options]);

  return null; // Component doesn't render anything directly
};

/**
 * Toast Container component to be placed once at the top level of your application
 */
export const ToastContainer = () => {
  return (
    <ReactToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

export default Toast; 