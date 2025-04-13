const getBaseUrl = () => {
    // Check if we're in development or production
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    // Return appropriate API URL based on environment
    return isDevelopment ? "https://back1-3byw.onrender.com" : "https://back1-3byw.onrender.com";
}

export default getBaseUrl;