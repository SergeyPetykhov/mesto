export class Card {

  static selectors = {
    elementsList: '.elements__list-item',
    elementsName: '.elements__name',
    elementsImage: '.elements__image',
    elementsDeleteButton: '.elements__delete-button',
    elementsLikeButton: '.elements__like-button',
  }

  constructor({handleCardClick}, name, src, alt, templateSelector) {
    this._handleCardClick = handleCardClick;
    this._name = name;
    this._src = src;
    this._alt = alt;
    this._templateSelector = templateSelector;
  }


   _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector(Card.selectors.elementsList)
      .cloneNode(true);

    return cardElement;
  }


  _setEventListeners() {
    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteButtonClick();
    });

    this._likeButton.addEventListener('click', () => {
      this._handleLikeButtonClick();
    });

    this._image.addEventListener('click', () => {
      this._handleCardClick();
    });
  }


  _handleDeleteButtonClick() {
    this._element.remove();
    this._element = null;
  }

  _handleLikeButtonClick() {
    this._likeButton.classList.toggle('elements__like-button_active');
  }


  createCard() {
    this._element = this._getTemplate();

    this._likeButton = this._element.querySelector(Card.selectors.elementsLikeButton);
    this._deleteButton = this._element.querySelector(Card.selectors.elementsDeleteButton);
    this._image = this._element.querySelector(Card.selectors.elementsImage);

    this._elementsName = this._element.querySelector(Card.selectors.elementsName);
    this._elementsImage = this._element.querySelector(Card.selectors.elementsImage);

    this._elementsName.textContent = this._name;
    this._elementsImage.src = this._src;
    this._elementsImage.alt = this._alt;

    this._setEventListeners();
    return this._element;
  }
}
