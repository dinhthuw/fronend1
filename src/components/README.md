# Reusable Toast Component

This directory contains a reusable Toast component that can be used to display notifications throughout the application.

## Usage

There are two ways to use the Toast functionality:

### 1. Using the Toast Component (Recommended)

```jsx
import { useState } from 'react';
import Toast from '../components/Toast';

const MyComponent = () => {
  const [toastConfig, setToastConfig] = useState({ type: '', message: '' });

  const handleSuccess = () => {
    setToastConfig({
      type: 'success',
      message: 'Operation completed successfully!'
    });
  };

  const handleError = () => {
    setToastConfig({
      type: 'error',
      message: 'An error occurred!'
    });
  };

  return (
    <div>
      {/* Include Toast component */}
      <Toast type={toastConfig.type} message={toastConfig.message} />
      
      <button onClick={handleSuccess}>Show Success</button>
      <button onClick={handleError}>Show Error</button>
    </div>
  );
};
```

### 2. Using the Toast Utility Functions Directly

```jsx
import { showSuccessToast, showErrorToast } from '../utils/ToastUtils';

const MyComponent = () => {
  const handleSuccess = () => {
    showSuccessToast('Operation completed successfully!');
  };

  const handleError = () => {
    showErrorToast('An error occurred!');
  };

  return (
    <div>
      <button onClick={handleSuccess}>Show Success</button>
      <button onClick={handleError}>Show Error</button>
    </div>
  );
};
```

## Available Toast Types

- `success` - For successful operations
- `error` - For error messages
- `info` - For informational messages
- `warning` - For warning messages

## Configuration Options

Both the Toast component and utility functions accept an optional `options` parameter where you can customize the toast appearance and behavior:

```jsx
// Using component
setToastConfig({
  type: 'success',
  message: 'Success message',
  options: { 
    autoClose: 5000,
    position: 'bottom-right'
  }
});

// Using utility
showSuccessToast('Success message', { 
  autoClose: 5000, 
  position: 'bottom-right' 
});
```

## Note

The `ToastContainer` is already included in the App.jsx file, so you don't need to add it to your components. 