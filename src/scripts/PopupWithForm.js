import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({ handleSubmitForm }, popupSelector) {
    super();
    this._handleSubmitForm = handleSubmitForm;

    this._popup = document.querySelector(popupSelector);
    this._popupCloseButton = this._popup.querySelector('.popupClose-button');
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputs = this._popupForm.querySelectorAll('.popup__input');
    this._errors = this._popupForm.querySelectorAll('.error');
  }


  _getInputValues() {
    this._data = [];
    for (let i = 0; i < this._inputs.length; i++) {
      this._data[i] = this._inputs[i].value;
    }
    return this._data;
  }


  close() {
    this._popupForm.reset();

    this._inputs.forEach(function (input) {
      input.classList.remove('popup__input_type_error');
    });

    this._errors.forEach(function (error) {
      error.textContent = '';
      error.classList.remove('popup__error_visible');
    });

    super.close();
  }


  setEventListeners() {
    this._popupCloseButton.addEventListener('click', () => {
      this.close();
    });

    this._popup.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });

    this._popupForm.addEventListener('submit', (evt) => {
      this._handleSubmitForm(evt);
    });
  }

}
