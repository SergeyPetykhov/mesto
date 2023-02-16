export class Card {

  static selectors = {
    elementsList: '.elements__list-item',
    elementsName: '.elements__name',
    elementsImage: '.elements__image',
    elementsDeleteButton: '.elements__delete-button',
    elementsLikeButton: '.elements__like-button',
    elementsLikeCounter: '.elements__like-counter',
  }

  constructor({ handleCardClick, handleDeleteButtonClick, handleLikeButtonClick }, name, src, alt, templateSelector, cardId, ownerId, likes, profileId) {
    this._handleCardClick = handleCardClick;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    this._handleLikeButtonClick = handleLikeButtonClick;
    this._name = name;
    this._src = src;
    this._alt = alt;
    this._templateSelector = templateSelector;
    this._cardId = cardId;
    this._ownerId = ownerId;
    this._likes = likes;
    this._likesLength = likes.length;
    this._profileId = profileId;
    this._isLiked = false;

    this._element = this._getTemplate();
    this._likeCounter = this._element.querySelector(Card.selectors.elementsLikeCounter);
    this._likeButton = this._element.querySelector(Card.selectors.elementsLikeButton);
    this._deleteButton = this._element.querySelector(Card.selectors.elementsDeleteButton);
    this._image = this._element.querySelector(Card.selectors.elementsImage);
    this._elementsName = this._element.querySelector(Card.selectors.elementsName);
    this._elementsImage = this._element.querySelector(Card.selectors.elementsImage);
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

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  addLikeCard(likesCount) {
    this._likeButton.classList.add('elements__like-button_active');
    this._likeCounter.textContent = likesCount + 1;
    this._likesLength = likesCount + 1;
    this._isLiked = true;
  }

  deleteLikeCard(likesCount) {
    this._likeButton.classList.remove('elements__like-button_active');
    this._likeCounter.textContent = likesCount - 1;
    this._likesLength = likesCount - 1;
    this._isLiked = false;
  }

  checkLikeCard(likesArray) {
    if(likesArray._id === this._profileId) {
     return true;
    }
  }

  getLikeCard() {
    return {isLiked: this._isLiked, likeCount: this._likesLength};
  }

  createCard() {
    this._elementsName.textContent = this._name;
    this._elementsImage.src = this._src;
    this._elementsImage.alt = this._alt;
    this._likeCounter.textContent = this._likes.length;

    this._likes.forEach(likesArray => {
      if (this.checkLikeCard(likesArray)) {
        this._likeButton.classList.add('elements__like-button_active');
        this._isLiked = true;
      }
    });

    this._setEventListeners();

    return this._element;
  }
}
