import { Popup } from './Popup.js';

export class PopupDeleteConfirm extends Popup {
  constructor({ handleSubmitForm }, popupSelector) {
    super();
    this._handleSubmitForm = handleSubmitForm;

    this._popup = document.querySelector(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');

  }

  getDeleteCard(card) {
    this._deleteCard = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._deleteCard);
    });
  }

}
