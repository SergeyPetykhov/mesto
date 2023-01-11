export class FormValidator {
  constructor(config, validationElement) {
    this._config = config;
    this._validationElement = validationElement;
  }

  _setEventListeners() {
    const form = document.querySelector(this._validationElement);
    const inputs = [...form.querySelectorAll(config.inputSelector)];
    const button = form.querySelector(config.submitButtonSelector);

    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    inputs.forEach((input) => {
      input.addEventListener('input', () => {

        this._checkInputValidity(input, this._config);
        this._changeButtonAvalible(inputs, button, this._config);

      });
    });
  }

  _checkInputValidity(input, config) {
    const form = document.querySelector(this._validationElement);
    const error = form.querySelector(`#${input.id}-error`);

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

  _changeButtonAvalible(inputs, button, config) {
    const isFormValid = inputs.every(function (input) {
      return input.validity.valid;
    });

    if (isFormValid) {
      this._enableSubmitButton(button, config);
    }
    else {
      this._disableSubmitButton(button, config);
    }
  }

  _enableSubmitButton(button, config) {
    button.classList.remove(config.inactiveButtonClass);
    button.classList.add(config.activeButtonClass);
    button.disabled = false;
  }

  _disableSubmitButton(button, config) {
    button.classList.remove(config.activeButtonClass);
    button.classList.add(config.inactiveButtonClass);
    button.disabled = true;
  }


  enableValidation() {
    this._setEventListeners();
  }

}




