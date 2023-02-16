export class FormValidator {
  constructor(config, validationElement) {
    this._config = config;
    this._validationElement = validationElement;

    this._form = document.querySelector(this._validationElement);
    this._inputs = [...this._form.querySelectorAll(this._config.inputSelector)];
    this._errors = [...this._form.querySelectorAll(this._config.errorSelector)];
    this._button = this._form.querySelector(this._config.submitButtonSelector);
  }

  _setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {

        this._checkInputValidity(input);
        this.changeButtonAvalible();

      });
    });
  }

  _checkInputValidity(input) {
    this._error = this._form.querySelector(`#${input.id}-error`);

    if (input.validity.valid) {
      this._error.textContent = '';
      this._error.classList.remove(this._config.errorClass);
      input.classList.remove(this._config.inputErrorClass);
    }
    else {
      this._error.textContent = input.validationMessage;
      this._error.classList.add(this._config.errorClass);
      input.classList.add(this._config.inputErrorClass);
    }
  }

  removeValidationErrors() {
    this._form.reset();
    this._inputs.forEach(function (input) {
      input.classList.remove('popup__input_type_error');
    });
    this._errors.forEach(function (error) {
      error.textContent = '';
      error.classList.remove('popup__error_visible');
    });
  }

  changeButtonAvalible() {
    this._isFormValid = this._inputs.every(function (input) {
      return input.validity.valid;
    });

    if (this._isFormValid) {
      this._enableSubmitButton();
    }
    else {
      this._disableSubmitButton();
    }
  }

  _enableSubmitButton() {
    this._button.classList.remove(this._config.inactiveButtonClass);
    this._button.classList.add(this._config.activeButtonClass);
    this._button.disabled = false;
  }

  _disableSubmitButton() {
    this._button.classList.remove(this._config.activeButtonClass);
    this._button.classList.add(this._config.inactiveButtonClass);
    this._button.disabled = true;
  }

  enableValidation() {
    this._setEventListeners();
  }

}




