// Select Form and Controls
const form = document.getElementById("registrationForm");
const successMessage = document.getElementById("successMessage");
const resetBtn = document.getElementById("resetBtn");
const togglePasswordBtn = document.getElementById("togglePasswordBtn");
const passwordInput = document.getElementById("password");

// Select Input Fields
const studentIdInput = document.getElementById("studentId");
const fullNameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const dobInput = document.getElementById("dob");
const programSelect = document.getElementById("program");
const yearLevelSelect = document.getElementById("yearLevel");
const confirmPasswordInput = document.getElementById("confirmPassword");
const addressInput = document.getElementById("address");
const agreementCheckbox = document.getElementById("agreement");

// -------------------------------------------------------------
// 1. Feature: Interactive Password Visibility Toggle
// Demonstrates: classList.toggle() & Attribute Manipulation (type)
// -------------------------------------------------------------
togglePasswordBtn.addEventListener("click", function () {
  // Toggle UI class on button
  togglePasswordBtn.classList.toggle("active");

  // Dynamic Attribute Manipulation (type attribute)
  const isPassword = passwordInput.getAttribute("type") === "password";
  const newType = isPassword ? "text" : "password";
  
  // Set type attribute on DOM element
  passwordInput.setAttribute("type", newType);
  togglePasswordBtn.textContent = isPassword ? "Hide" : "Show";
});

// -------------------------------------------------------------
// Helper Functions for Validation & Errors
// -------------------------------------------------------------

// Display error message and apply .error class using classList.add()
function showError(inputElement, message, customErrorContainer = null) {
  const container = customErrorContainer || inputElement.nextElementSibling;
  
  if (inputElement && inputElement.classList) {
    inputElement.classList.add("error");
  }
  
  if (container) {
    container.textContent = message;
  }
}

// Clear error message and remove .error class using classList.remove()
function clearError(inputElement, customErrorContainer = null) {
  const container = customErrorContainer || inputElement.nextElementSibling;
  
  if (inputElement && inputElement.classList) {
    inputElement.classList.remove("error");
  }
  
  if (container) {
    container.textContent = "";
  }
}

// Reset all field validation states
function clearAllErrors() {
  const errorInputs = document.querySelectorAll(".error");
  errorInputs.forEach(input => input.classList.remove("error"));

  const errorTexts = document.querySelectorAll(".error-text");
  errorTexts.forEach(small => small.textContent = "");

  successMessage.classList.add("hidden");
}

// Email format regex check
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// -------------------------------------------------------------
// 2. Form Submission Event Listener
// Demonstrates: addEventListener, submit event, event.preventDefault()
// -------------------------------------------------------------
form.addEventListener("submit", function (event) {
  // Prevent page refresh / default browser submission behavior
  event.preventDefault();

  let isValid = true;
  clearAllErrors();

  // --- Field 1: Student ID (Using data-* dataset attributes) ---
  const minIdLength = parseInt(studentIdInput.dataset.minLength, 10);
  const fieldName = studentIdInput.dataset.fieldName;
  const trimmedId = studentIdInput.value.trim();

  if (trimmedId === "") {
    showError(studentIdInput, `${fieldName} is required.`);
    isValid = false;
  } else if (trimmedId.length < minIdLength) {
    showError(studentIdInput, `${fieldName} must be at least ${minIdLength} characters.`);
    isValid = false;
  } else {
    clearError(studentIdInput);
  }

  // --- Field 2: Full Name ---
  if (fullNameInput.value.trim() === "") {
    showError(fullNameInput, "Full Name is required.");
    isValid = false;
  } else {
    clearError(fullNameInput);
  }

  // --- Field 3: Email ---
  const trimmedEmail = emailInput.value.trim();
  if (trimmedEmail === "") {
    showError(emailInput, "Email address is required.");
    isValid = false;
  } else if (!isValidEmail(trimmedEmail)) {
    showError(emailInput, "Please enter a valid email address.");
    isValid = false;
  } else {
    clearError(emailInput);
  }

  // --- Field 4: Phone Number (Using data-pattern dataset attribute) ---
  const phonePattern = new RegExp(phoneInput.dataset.pattern);
  const trimmedPhone = phoneInput.value.trim();

  if (trimmedPhone === "") {
    showError(phoneInput, "Phone number is required.");
    isValid = false;
  } else if (!phonePattern.test(trimmedPhone)) {
    showError(phoneInput, "Format must be 11 digits starting with 09 (e.g., 09123456789).");
    isValid = false;
  } else {
    clearError(phoneInput);
  }

  // --- Field 5: Date of Birth ---
  if (dobInput.value === "") {
    showError(dobInput, "Date of Birth is required.");
    isValid = false;
  } else {
    clearError(dobInput);
  }

  // --- Field 6: Gender Selection ---
  const selectedGender = document.querySelector('input[name="gender"]:checked');
  const genderErrorText = document.getElementById("genderError");
  if (!selectedGender) {
    genderErrorText.textContent = "Please select a gender.";
    isValid = false;
  } else {
    genderErrorText.textContent = "";
  }

  // --- Field 7: Program ---
  if (programSelect.value === "") {
    showError(programSelect, "Please select an academic program.");
    isValid = false;
  } else {
    clearError(programSelect);
  }

  // --- Field 8: Year Level ---
  if (yearLevelSelect.value === "") {
    showError(yearLevelSelect, "Please select a year level.");
    isValid = false;
  } else {
    clearError(yearLevelSelect);
  }

  // --- Field 9: Password ---
  const passwordVal = passwordInput.value.trim();
  if (passwordVal === "") {
    showError(passwordInput, "Password is required.");
    isValid = false;
  } else if (passwordVal.length < 6) {
    showError(passwordInput, "Password must be at least 6 characters.");
    isValid = false;
  } else {
    clearError(passwordInput);
  }

  // --- Field 10: Confirm Password ---
  const confirmPasswordVal = confirmPasswordInput.value.trim();
  if (confirmPasswordVal === "") {
    showError(confirmPasswordInput, "Please confirm your password.");
    isValid = false;
  } else if (confirmPasswordVal !== passwordVal) {
    showError(confirmPasswordInput, "Passwords do not match.");
    isValid = false;
  } else {
    clearError(confirmPasswordInput);
  }

  // --- Field 11: Address ---
  if (addressInput.value.trim() === "") {
    showError(addressInput, "Address is required.");
    isValid = false;
  } else {
    clearError(addressInput);
  }

  // --- Field 12: Agreement Checkbox ---
  const agreementErrorText = document.getElementById("agreementError");
  if (!agreementCheckbox.checked) {
    agreementErrorText.textContent = "You must agree to the terms before submitting.";
    isValid = false;
  } else {
    agreementErrorText.textContent = "";
  }

  // --- Final Verification ---
  if (isValid) {
    // Reveal success banner
    successMessage.classList.remove("hidden");
    
    // Smooth scroll to top to see success message
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

// -------------------------------------------------------------
// 3. Reset Button Implementation
// -------------------------------------------------------------
resetBtn.addEventListener("click", function () {
  // Clear field inputs
  form.reset();

  // Clear all validation errors & hide success message
  clearAllErrors();

  // Reset password field attribute & button toggle state to default
  passwordInput.setAttribute("type", "password");
  togglePasswordBtn.textContent = "Show";
  togglePasswordBtn.classList.remove("active");
});