import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this._popupImageElementCaption = this._popup.querySelector('.popup-image__figcaption');
    this._popupImageElementImg = this._popup.querySelector('.popup-image__img');
  }

  open(name, src, alt) {
    this._popupImageElementCaption.textContent = name;
    this._popupImageElementImg.src = src;
    this._popupImageElementImg.alt = alt;

    super.open();
  }

}
