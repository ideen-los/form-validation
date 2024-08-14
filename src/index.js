import './style.scss';

const validateForm = function (eventType, targetElement = undefined) {
  const inputs = document.querySelectorAll('input');
  const select = document.querySelector('select');
  let password, passwordConfirm;

  /* 
  Error messages that are displayed, when a form element is invalid.
  Usage: add a form element's id as the key and a corresponding error message as the value.
  */
  const errorMessages = {
    mail: 'Bitte geben Sie eine valide E-Mail-Adresse an',
    country: 'Bitte wählen Sie ein Land',
    zip: 'Bitte geben Sie eine gültige Postleitzahl mit 5 Ziffern an',
    password:
      'Bitte geben Sie ein Passwort mit 1 Sonderzeichen, 1 Klein- sowie 1 Großbuchstaben  und mindestens 8 Zeichen ein',
    passwordConfirm: 'Beide Passwörter müssen übereinstimmen',
  };

  let valid = true;

  /* 
  Check country selection 
  and display error message when invalid
  */
  const validateSelectField = function () {
    if (!select.validity.valid) {
      select.nextElementSibling.textContent = errorMessages[select.id];
      valid = false;
    } else if (select.validity.valid) {
      select.nextElementSibling.textContent = '';
    }
  };

  if (targetElement && select === targetElement && eventType === 'change') {
    validateSelectField();
  } else if (!targetElement) {
    validateSelectField();
  }

  /* 
  Password comfirmation check:
  If passwordConfirm value doesn't match
  password value, display error message.
  */
  // Select the password fields
  for (let input of inputs) {
    if (input.id === 'password') {
      password = input;
    } else if (input.id === 'passwordConfirm') {
      passwordConfirm = input;
    }
  }

  const validatePasswordField = function () {
    // Check if the values match
    if (passwordConfirm.value !== password.value) {
      passwordConfirm.nextElementSibling.textContent =
        errorMessages[passwordConfirm.id];
      passwordConfirm.setCustomValidity('Error');
      valid = false;
    } else if (passwordConfirm.value === password.value) {
      passwordConfirm.nextElementSibling.textContent = '';
      passwordConfirm.setCustomValidity('');
    }
  };

  if (
    targetElement &&
    targetElement === passwordConfirm &&
    eventType === 'input'
  ) {
    validatePasswordField();
  } else if (!targetElement) {
    validatePasswordField();
  }

  /*
  Check email, zip code, password for validity
  and display error message when invalid
  */
  const validateInputFields = function (input) {
    if (!input.validity.valid) {
      Object.entries(errorMessages).forEach(([key, value]) => {
        if (input.id === key) {
          input.nextElementSibling.textContent = value;
          valid = false;
        }
      });
    } else if (input.validity.valid) {
      input.nextElementSibling.textContent = '';
    }
  };

  for (let input of inputs) {
    // Check if the user is focusing a specific input element
    if (targetElement && input === targetElement && eventType === 'input') {
      validateInputFields(input);
    } else if (!targetElement) {
      // If the user isn't focusing a specific element, check all elements
      validateInputFields(input);
    }
  }

  return valid;
};

/* 
Validates a form on the submit event
*/
const validateFormOnSubmit = function () {
  const form = document.querySelector('form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    validateForm(e.type);

    // Check if all fields are valid
    if (!validateForm()) {
      form.className = 'was-validated';
    } else {
      showSuccessMessage();
    }
  });
};

/* 
Validates input fields on the input event
*/
const validateFormOnInput = function () {
  const inputs = document.querySelectorAll('input');

  inputs.forEach((input) => {
    input.addEventListener('input', (e) => {
      validateForm(e.type, e.target);
    });
  });
};

/* 
Validates select fields on the change event
*/
const validateFormOnChange = function () {
  const select = document.querySelector('select');

  select.addEventListener('change', (e) => {
    validateForm(e.type, e.target);
  });
};

const showForm = function () {
  const form = document.querySelector('form');
  const message = document.querySelector('.message');
  const goBackButton = document.querySelector('.go-back');

  form.style.display = 'block';
  message.style.display = 'none';
  goBackButton.style.display = 'none';
};

const hideForm = function () {
  const form = document.querySelector('form');
  form.style.display = 'none';
};

const showSuccessMessage = function () {
  const form = document.querySelector('form');
  const message = document.querySelector('.message');
  const goBackButton = document.querySelector('.go-back');

  form.reset();
  hideForm();
  message.style.display = 'block';
  goBackButton.style.display = 'block';
  goBackButton.addEventListener('click', showForm, { once: true });
};

// Initiate validation
validateFormOnInput();
validateFormOnChange();
validateFormOnSubmit();
