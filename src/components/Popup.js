export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  open() {
    this._popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this._popup.querySelector('.popupClose-button').addEventListener('click', () => {
      this.close();
    });
    this._popup.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
  }

}


