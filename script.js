/*
Name: Quoc Phong Tran
Course: CST8285
Lab section: 321
Professor: Hala Own
File: script.js
Date Created: November 08, 2024
Description: JavaScript validation for a subscription form. It includes functions to validate email, username, and password fields, with real-time error highlighting and form reset handling.
*/

// Selecting input elements
let emailInput = document.querySelector("#email");
let loginInput = document.querySelector("#login");
let passwordInput = document.querySelector("#pass");
let passwordInput2 = document.querySelector("#pass2");
let newsletterInput = document.querySelector("#newsletter");
let termInput = document.querySelector("#terms");

// Create error message elements for each input field and append them to the corresponding containers
let emailError = document.createElement("p");
emailError.setAttribute("class", "warning");
document.querySelectorAll(".textfield")[0].append(emailError);

let loginError = document.createElement("p");
loginError.setAttribute("class", "warning");
document.querySelectorAll(".textfield")[1].append(loginError);

let passwordError = document.createElement("p");
passwordError.setAttribute("class", "warning");
document.querySelectorAll(".textfield")[2].append(passwordError);

let passwordError2 = document.createElement("p");
passwordError2.setAttribute("class", "warning");
document.querySelectorAll(".textfield")[3].append(passwordError2);

let termError = document.createElement("p");
termError.setAttribute("class", "warning");
document.querySelectorAll(".checkbox")[1].append(termError);

// Defining error messages for validation feedback
let emailErrorMsg =
  "x Email address should be non-empty with the format xyx@xyz.xyz.";
let loginErrorMsg =
  "x User name should be non-empty, and within 30 characters long.";
let passwordErrorMsg =
  "x Password should be at least 8 characters: 1 uppercase, 1 lowercase.";
let passwordError2Msg = "x Please retype password";
let termErrorMsg = "x Please accept the terms and conditions.";
let defaultMsg = "";

// Class name to highlight error inputs
let inputClassName = "error-input-highlight";

// Function to validate email format
function validateEmail() {
  let email = emailInput.value;
  let regexp = /\S+@\S+\.\S+/;
  return regexp.test(email) ? defaultMsg : emailErrorMsg;
}

// Function to validate username length and non-emptiness
function validateLogin() {
  let login = loginInput.value;
  return login === "" || login.length >= 30 ? loginErrorMsg : defaultMsg;
}

// Function to validate password length
function validatePassword() {
  let password = passwordInput.value;
  return password === "" || password.length < 8 ? passwordErrorMsg : defaultMsg;
}
// Function to ensure both passwords match
function validatePassword2() {
  let password2 = passwordInput2.value;
  let password = passwordInput.value;
  return password2 !== password || password2 === ""
    ? passwordError2Msg
    : defaultMsg;
}
// Function to validate terms and conditions checkbox
function validateTerms() {
  return termInput.checked ? defaultMsg : termErrorMsg;
}
// Display alert when the newsletter checkbox is selected
newsletterInput.addEventListener("click", () => {
  if (newsletterInput.checked) {
    alert("⚠️By subscribing, you may receive spam emails.");
  }
});

// Functions to add and remove class name for error highlighting
function removeClassName(inputElement, className) {
  inputElement.classList.remove(className);
}

function addClassName(inputElement, className) {
  inputElement.classList.add(className);
}
// Function to highlight input fields with errors and set error messages
function highlightErrorInputField(inputElement, errorInput, errorMsg) {
  if (errorMsg === defaultMsg) {
    removeClassName(inputElement, inputClassName);
    errorInput.textContent = defaultMsg;
  } else {
    addClassName(inputElement, inputClassName);
    errorInput.textContent = errorMsg;
  }
}

// Main validation function called on form submission
function validate() {
  let valid = true;
  let emailValidation = validateEmail();
  highlightErrorInputField(emailInput, emailError, emailValidation);
  if (emailValidation !== defaultMsg) {
    valid = false;
  }
  let loginValidation = validateLogin();
  highlightErrorInputField(loginInput, loginError, loginValidation);
  loginValidation !== defaultMsg
    ? (valid = false)
    : (loginInput.value = loginInput.value.toLowerCase());
  let passwordValidation = validatePassword();
  highlightErrorInputField(passwordInput, passwordError, passwordValidation);
  if (passwordValidation !== defaultMsg) {
    valid = false;
  }
  let password2Validation = validatePassword2();
  highlightErrorInputField(passwordInput2, passwordError2, password2Validation);
  if (password2Validation !== defaultMsg) {
    valid = false;
  }
  let termsValidation = validateTerms();
  if (termsValidation !== defaultMsg) {
    termError.textContent = termsValidation;
    valid = false;
  }
  return valid;
}

// Function to reset form errors when reset button is clicked
function resetFormError() {
  emailError.textContent = defaultMsg;
  removeClassName(emailInput, inputClassName);

  loginError.textContent = defaultMsg;
  removeClassName(loginInput, inputClassName);

  passwordError.textContent = defaultMsg;
  removeClassName(passwordInput, inputClassName);

  passwordError2.textContent = defaultMsg;
  removeClassName(passwordInput2, inputClassName);

  termError.textContent = defaultMsg;
}
// Event listener for resetting form errors
document.querySelector("form").addEventListener("reset", resetFormError);

// Event listeners for real-time validation on blur
emailInput.addEventListener("blur", () => {
  let x = validateEmail();
  highlightErrorInputField(emailInput, emailError, x);
});

loginInput.addEventListener("blur", () => {
  let x = validateLogin();
  highlightErrorInputField(loginInput, loginError, x);
});

passwordInput.addEventListener("blur", () => {
  let x = validatePassword();
  highlightErrorInputField(passwordInput, passwordError, x);
});

passwordInput2.addEventListener("blur", () => {
  let x = validatePassword2();
  highlightErrorInputField(passwordInput2, passwordError2, x);
});

// Event listener to clear error message for terms checkbox when checked
termInput.addEventListener("change", function () {
  if (this.checked) {
    termError.textContent = defaultMsg;
  }
});
