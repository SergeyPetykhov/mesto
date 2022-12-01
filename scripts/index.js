/***************** profile  *************************/
/* variable */
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');



/***************** popup *****************************/
/*variable */
const popupElement = document.querySelector('.popup');
const formElement = popupElement.querySelector('.popup__form');
const closePopupButton = popupElement.querySelector('.popup__close-button');
const popupElementName = popupElement.querySelector('.form__item_el_name');
const popupElementActivity = popupElement.querySelector('.form__item_el_activity');

/* function */
const openPopup = function () {
  popupElement.classList.add('popup_is-opened');
  popupElementName.value = profileName.textContent;
  popupElementActivity.value = profileActivity.textContent;
}

const closePopup = function () {
  popupElement.classList.remove('popup_is-opened');
}

const formSubmitHandler = function (evt) {
  evt.preventDefault();
  profileName.textContent = popupElementName.value;
  profileActivity.textContent = popupElementActivity.value;
  closePopup ();
}

/* event */
editButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);



/******************* popup-image *****************************/
/*variable */
const popupImageElement = document.querySelector('.popup-image');
const closePopupImageButton = popupImageElement.querySelector('.popup-image__close-button');
const popupImageElementImg = popupImageElement.querySelector('.popup-image__img');
const popupImageElementCaption = popupImageElement.querySelector('.popup-image__figcaption');

/* function */
const closePopupImage = function () {
  popupImageElement.classList.remove('popup-image_is-opened');
}

/* event */
closePopupImageButton.addEventListener('click', closePopupImage);



/******************* popup-elements *****************************/
/*variable */
const popupElementsElement = document.querySelector('.popup-elements');
const formElementsElement  = popupElementsElement.querySelector('.popup-elements__form');
const closePopupElementsButton = popupElementsElement.querySelector('.popup-elements__close-button');
const popupElementsElementName = popupElementsElement.querySelector('.form-elements__item_el_name');
const popupElementsElementLink = popupElementsElement.querySelector('.form-elements__item_el_link');

/* function */
const openPopupElements = function () {
  popupElementsElement.classList.add('popup-elements_is-opened');

  popupElementsElementName.value = '';
  popupElementsElementLink.value = '';
}

const closePopupElements = function () {
  popupElementsElement.classList.remove('popup-elements_is-opened');
}

function createFormElementPrepend() {
  const elementsListItem = elementsTemplate.cloneNode(true);

  const elementsListItemName = elementsListItem.querySelector('.elements__name');
  const elementsListItemImage = elementsListItem.querySelector('.elements__image');

  const elementsDeleteButton = elementsListItem.querySelector('.elements__delete-button');
  const elementsLikeButton = elementsListItem.querySelector('.elements__like-button');

  const elementsOpenBigImage = elementsListItem.querySelector('.elements__image');

  elementsListItemName.textContent = popupElementsElementName.value;
  elementsListItemImage.src = popupElementsElementLink.value;
  elementsListItemImage.alt = popupElementsElementName.value;

  const handleElementsDeleteButtonClick = function (evt) {
    evt.target.closest('.elements__list-item').remove();
  };

  const handleElementslikeButtonClick = function (evt) {
    evt.target.classList.toggle('elements__like-button_active');
  };

  const handleElementsOpenBigImageClick = function (evt) {
    popupImageElement.classList.add('popup-image_is-opened');

    popupImageElementImg.src = popupElementsElementLink.value;
    popupImageElementImg.alt = popupElementsElementName.value;
    popupImageElementCaption.textContent = popupElementsElementName.value;
  };

  elementsDeleteButton.addEventListener('click', handleElementsDeleteButtonClick);
  elementsLikeButton.addEventListener('click', handleElementslikeButtonClick);
  elementsOpenBigImage.addEventListener('click', handleElementsOpenBigImageClick);

  elementsList.prepend(elementsListItem);
}

const formElementsSubmitHandler = function (evt) {
  evt.preventDefault();
  createFormElementPrepend();
  closePopupElements();
}

/* event */
addButton.addEventListener('click', openPopupElements);
closePopupElementsButton.addEventListener('click', closePopupElements);
formElementsElement.addEventListener('submit', formElementsSubmitHandler);



/********************** elements *******************************/
/*variable */
const initialElements = [
  {
    name: 'Архыз',
    link: './images/arkhyz.jpg',
    alt: 'Вид на долину Архыз'
  },
  {
    name: 'Челябинская область',
    link: './images/chelyabinsk-oblast.jpg',
    alt: 'Зимний вид на лесное озеро'
  },
  {
    name: 'Иваново',
    link: './images/ivanovo.jpg',
    alt: 'Вид на жилой массив в городе'
  },
  {
    name: 'Камчатка',
    link: './images/kamchatka.jpg',
    alt: 'Вид на гору с плато'
  },
  {
    name: 'Холмогорский район',
    link: './images/kholmogorsky-rayon.jpg',
    alt: 'Железная дорога посреди леса'
  },
  {
    name: 'Байкал',
    link: './images/baikal.jpg',
    alt: 'Вид на берег зимнего озера'
  }
];
const elementsList = document.querySelector('.elements__list');

/* template */
const elementsTemplate = document.querySelector('#elements-template').content.querySelector('.elements__list-item');

/* function */
function createElement(item) {
  const elementsListItem = elementsTemplate.cloneNode(true);

  const elementsListItemName = elementsListItem.querySelector('.elements__name');
  const elementsListItemImage = elementsListItem.querySelector('.elements__image');

  const elementsDeleteButton = elementsListItem.querySelector('.elements__delete-button');
  const elementsLikeButton = elementsListItem.querySelector('.elements__like-button');

  const elementsOpenBigImage = elementsListItem.querySelector('.elements__image');

  elementsListItemName.textContent = item.name;
  elementsListItemImage.src = item.link;
  elementsListItemImage.alt = item.alt;

  const handleElementsDeleteButtonClick = function (evt) {
    evt.target.closest('.elements__list-item').remove();
  };

  const handleElementslikeButtonClick = function (evt) {
    evt.target.classList.toggle('elements__like-button_active');
  };

  const handleElementsOpenBigImageClick = function (evt) {
    popupImageElement.classList.add('popup-image_is-opened');

    popupImageElementImg.src = item.link;
    popupImageElementImg.alt = item.alt;
    popupImageElementCaption.textContent = item.name;
  };

  elementsDeleteButton.addEventListener('click', handleElementsDeleteButtonClick);
  elementsLikeButton.addEventListener('click', handleElementslikeButtonClick);
  elementsOpenBigImage.addEventListener('click', handleElementsOpenBigImageClick);

  return elementsListItem;
}

initialElements.forEach(function(item) {
  const element = createElement(item);
  elementsList.append(element);
});


