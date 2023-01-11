import { popupImageElement, popupImageElementImg, popupImageElementCaption, openPopup } from './index.js';

export class Card {

  static selectors = {
    elementsName: '.elements__name',
    elementsImage: '.elements__image',
    elementsDeleteButton: '.elements__delete-button',
    elementsLikeButton: '.elements__like-button',
    elementsOpenBigImage: '.elements__image'
  }

  constructor(name, src, alt, templateSelector) {
    this._name = name;
    this._src = src;
    this._alt = alt;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .children[0]
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector(Card.selectors.elementsDeleteButton).addEventListener('click', () => {
      this._handleDeleteButtonClick();
    });

    this._element.querySelector(Card.selectors.elementsLikeButton).addEventListener('click', () => {
      this._handleLikeButtonClick();
    });

    this._element.querySelector(Card.selectors.elementsOpenBigImage).addEventListener('click', () => {
      this._handleOpenBigImageClick();
    });
  }


  _handleDeleteButtonClick() {
    this._element.remove();
  }

  _handleLikeButtonClick() {
    this._element.querySelector(Card.selectors.elementsLikeButton).classList.toggle('elements__like-button_active');
  }

  _handleOpenBigImageClick() {
    popupImageElementCaption.textContent = this._name;
    popupImageElementImg.src = this._src;
    popupImageElementImg.alt = this._alt;
    openPopup(popupImageElement);
  }


  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(Card.selectors.elementsName).textContent = this._name;
    this._element.querySelector(Card.selectors.elementsImage).src = this._src;
    this._element.querySelector(Card.selectors.elementsImage).alt = this._alt;

    return this._element;
  }
}
