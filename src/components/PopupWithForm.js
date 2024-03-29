import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({ handleSubmitForm }, popupSelector) {
    super();
    this._handleSubmitForm = handleSubmitForm;
    this._popup = document.querySelector(popupSelector);
    this._popupCloseButton = this._popup.querySelector('.popupClose-button');
    this._popupForm = this._popup.querySelector('.popup__form');
    this._popupSaveButton = this._popup.querySelector('.popup__button-save');
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

  setSaveButtonText (text) {
   this._popupSaveButton.value = text;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
  }

}
