import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {

  open(name, src, alt) {
    const popupImageElementCaption = this._popup.querySelector('.popup-image__figcaption');
    const popupImageElementImg = this._popup.querySelector('.popup-image__img');

    popupImageElementCaption.textContent = name;
    popupImageElementImg.src = src;
    popupImageElementImg.alt = alt;

    super.open();
  }

}
