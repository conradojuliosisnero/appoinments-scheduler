// Regular expression for email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Regular expression for password validation (at least 8 characters, one uppercase, one lowercase, one number, and one special character)
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Regular expression for phone number validation (supports various formats)
const phoneRegex = /^\+?(\d{1,3})?[-.\s]?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})$/;

// Regular expression for URL validation
const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\/\w-]*)*\/?$/;

// Regular expression for date validation (YYYY-MM-DD format)
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

module.exports = {
    emailRegex,
    passwordRegex,
    phoneRegex,
    urlRegex,
    dateRegex
};