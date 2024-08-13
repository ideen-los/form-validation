import './style.scss';

const validateForm = function () {
  const form = document.querySelector('form');

  form.addEventListener('submit', (e) => {
    const submit = document.querySelector('button');
    const inputs = document.querySelectorAll('input');
    const select = document.querySelector('select');
    let password, passwordConfirm;

    console.log(form, inputs, select, submit);

    const errorMessages = {
      mail: 'Bitte geben Sie eine valide E-Mail-Adresse an',
      country: 'Bitte wählen Sie Ihr Land',
      zip: 'Bitte geben Sie eine gültige Postleitzahl mit 5 Ziffern an',
      password:
        'Das Passwort muss 1 Sonderzeichen, 1 Klein- sowie 1 Großbuchstaben enthalten und mindestens 8 Zeichen lang sein',
    };

    let valid = true;

    e.preventDefault();

    /* 
    Check email, zip code, password 
    and display error message when invalid
    */
    for (let input of inputs) {
      if (input.validity.valueMissing) {
        console.log('Bitte füllen Sie dieses Feld aus');
        valid = false;
      } else if (!input.validity.valid) {
        Object.entries(errorMessages).forEach(([key, value]) => {
          if (input.id === key) {
            console.log(value);
            valid = false;
          }
        });
      }
    }

    /* 
    Check country selection 
    and display error message when invalid
    */
    if (!select.validity.valid) {
      console.log(errorMessages[select.id]);
      valid = false;
    }

    /* 
    Password comfirmation check:
    If passwordConfirm value doesn't match
    password value, display error message.
    */

    // 1. select the password fields
    for (let input of inputs) {
      if (input.id === 'password') {
        password = input;
      } else if (input.id === 'passwordConfirm') {
        passwordConfirm = input;
      }
    }

    // 2. check if the values match
    if (passwordConfirm.value !== password.value) {
      console.log('Beide Passwörter müssen übereinstimmen');
      valid = false;
    }

    // Check if all fields are valid
    if (!valid) {
      console.log('Zoooooooooong!');
    } else {
      console.log('Good!');
    }
  });
};

validateForm();
