/* validation form and change avalible button */

const checkInputValidity = function (input, config){
  const error = document.querySelector(`#${input.id}-error`);

  if (input.validity.valid) {
    error.textContent = '';
    error.classList.remove(config.errorClass);
    input.classList.remove(config.inputErrorClass);
  }
  else {
    error.textContent = input.validationMessage;
    error.classList.add(config.errorClass);
    input.classList.add(config.inputErrorClass);
  }
}

const changeButtonAvalible = function (inputs, button, config){
  const isFormValid = inputs.every(function (input) {
    return input.validity.valid;
  });

  if (isFormValid) {
    button.classList.remove(config.inactiveButtonClass);
    button.classList.add(config.activeButtonClass);
    button.disabled = false;
  }
  else {
    button.classList.remove(config.activeButtonClass);
    button.classList.add(config.inactiveButtonClass);
    button.disabled = true;
  }
}

const enableValidation = function(config){
  const forms = [...document.querySelectorAll(config.formSelector)];


  forms.forEach(function (form) {
    const inputs = [...form.querySelectorAll(config.inputSelector)];
    const button = form.querySelector(config.submitButtonSelector);

    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    inputs.forEach(function (input) {
      input.addEventListener('input', function () {

        checkInputValidity(input, config);
        changeButtonAvalible(inputs, button, config);

      });
    });
  });
}
