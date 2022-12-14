/******************** variable *******************/
/* profile  */
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');

/* popup-profile */
const popupProfileElement = document.querySelector('.popup-profile');
const popupProfileFormElement = popupProfileElement.querySelector('.popup-profile__form');
const popupProfileCloseButton = popupProfileElement.querySelector('.popup-profile__close-button');
const popupProfileElementName = popupProfileElement.querySelector('.form-profile__item_el_name');
const popupProfileElementActivity = popupProfileElement.querySelector('.form-profile__item_el_activity');
const popupProfileElementSaveButton = popupProfileElement.querySelector('.popup-profile__save-button');

/* popup-image */
const popupImageElement = document.querySelector('.popup-image');
const popupImageCloseButton = popupImageElement.querySelector('.popup-image__close-button');
const popupImageElementImg = popupImageElement.querySelector('.popup-image__img');
const popupImageElementCaption = popupImageElement.querySelector('.popup-image__figcaption');

/* popup-elements */
const popupElementsElement = document.querySelector('.popup-elements');
const popupElementsFormElement = popupElementsElement.querySelector('.popup-elements__form');
const popupElementsCloseButton = popupElementsElement.querySelector('.popup-elements__close-button');
const popupElementsElementName = popupElementsElement.querySelector('.form-elements__item_el_name');
const popupElementsElementLink = popupElementsElement.querySelector('.form-elements__item_el_link');
const popupElementsElementSaveButton = popupElementsElement.querySelector('.popup-elements__save-button');

/* elements */
const elementsList = document.querySelector('.elements__list');

/* template */
const elementsTemplate = document.querySelector('#elements-template').content.querySelector('.elements__list-item');

/* popupsAll */
const popupsAll = document.querySelectorAll('.popup');

/* key close for Popup */
const keyClosePopup = 'Escape';


/******************** function ***********************/
/* open/close popups */
const openPopup = function (popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupByKeydownKeyClosePopup);
}

const closePopup = function (popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupByKeydownKeyClosePopup);
}

/* close popup keydown keyClosePopup */
const closePopupByKeydownKeyClosePopup = function (evt) {
  if (evt.key === keyClosePopup) {
    popupsAll.forEach(function (popup) {
      if (popup.classList.contains('popup_is-opened')) {
        closePopup(popup);
      }
    });
  }
}

/* clear popup form after close */
const clearPopupForm = function (popup, config) {
  const form = popup.querySelector(config.formSelector);
  const inputs = popup.querySelectorAll(config.inputSelector);
  const errors = popup.querySelectorAll(config.errorSelector);

  form.reset();

  inputs.forEach(function(input){
    input.classList.remove(config.inputErrorClass);
  });

  errors.forEach(function(error){
    error.textContent = '';
    error.classList.remove(config.errorClass);
  });
}

/* create-new-element */
const createNewElement = function (name, src, alt) {
  const elementsListItem = elementsTemplate.cloneNode(true);
  const elementsListItemName = elementsListItem.querySelector('.elements__name');
  const elementsListItemImage = elementsListItem.querySelector('.elements__image');
  const elementsDeleteButton = elementsListItem.querySelector('.elements__delete-button');
  const elementsLikeButton = elementsListItem.querySelector('.elements__like-button');
  const elementsOpenBigImage = elementsListItem.querySelector('.elements__image');

  elementsListItemName.textContent = name;
  elementsListItemImage.src = src;
  elementsListItemImage.alt = alt;

  const handleElementsDeleteButtonClick = function (evt) {
    evt.target.closest('.elements__list-item').remove();
  };

  const handleElementslikeButtonClick = function (evt) {
    evt.target.classList.toggle('elements__like-button_active');
  };

  const handleElementsOpenBigImageClick = function () {
    popupImageElementCaption.textContent = name;
    popupImageElementImg.src = src;
    if (elementsListItemImage.alt === '') {
      popupImageElementImg.alt = name;
    }
    else {
      popupImageElementImg.alt = alt;
    }
    openPopup(popupImageElement);
  };

  elementsDeleteButton.addEventListener('click', handleElementsDeleteButtonClick);
  elementsLikeButton.addEventListener('click', handleElementslikeButtonClick);
  elementsOpenBigImage.addEventListener('click', handleElementsOpenBigImageClick);

  return elementsListItem;
}

/* create-initial-element */
const createInitialElement = function (item) {
  const name = item.name;;
  const src = item.link;
  const alt = item.alt;
  const InitialElement = createNewElement(name, src, alt);

  return InitialElement;
}

initialElements.forEach(function (item) {
  const element = createInitialElement(item);
  elementsList.append(element);
});

/* popup-elements */
const openPopupElements = function () {
  popupElementsElementSaveButton.disabled = true;
  openPopup(popupElementsElement);
}

const closePopupElements = function () {
  closePopup(popupElementsElement);
  clearPopupForm(popupElementsElement, config);
}

const closePopupElementsByClickOnOverlay = function (evt) {
  if (evt.target === evt.currentTarget){
    closePopupElements();
  }
}

const createAddElement = function () {
  const name = popupElementsElementName.value;
  const src = popupElementsElementLink.value;
  const alt = popupElementsElementName.value;
  const AddElement = createNewElement(name, src, alt);

  elementsList.prepend(AddElement);
}

const formElementsSubmitHandler = function (evt) {
  evt.preventDefault();
  createAddElement();
  evt.target.reset();
  closePopupElements();
}

/* popup-profile */
const openPopupProfile = function () {
  popupProfileElementName.value = profileName.textContent;
  popupProfileElementActivity.value = profileActivity.textContent;
  popupProfileElementSaveButton.disabled = true;

  if (popupProfileElementName.value && popupProfileElementActivity.value) {
   popupProfileElementSaveButton.disabled = false;
   popupProfileElementSaveButton.classList.remove('popup__button-save_disabled');
   popupProfileElementSaveButton.classList.add('popup__button-save_avalible');
  }

  openPopup(popupProfileElement);
}

const closePopupProfile = function () {
  closePopup(popupProfileElement);
  clearPopupForm(popupProfileElement, config);
}

const closePopupProfileByClickOnOverlay = function (evt) {
  if (evt.target === evt.currentTarget){
    closePopupProfile();
  }
}

const formProfileSubmitHandler = function (evt) {
  evt.preventDefault();
  profileName.textContent = popupProfileElementName.value;
  profileActivity.textContent = popupProfileElementActivity.value;
  closePopupProfile();
}

/* popup-image */
const closePopupImage = function () {
  closePopup(popupImageElement);
}

const closePopupImageByClickOnOverlay = function (evt) {
  if (evt.target === evt.currentTarget){
    closePopupImage();
  }
}

/* validation popup form */
enableValidation(config);

/********************  event ********************/
/* popup-profile */
profileEditButton.addEventListener('click', openPopupProfile);
popupProfileCloseButton.addEventListener('click', closePopupProfile);
popupProfileElement.addEventListener('click', closePopupProfileByClickOnOverlay);
popupProfileFormElement.addEventListener('submit', formProfileSubmitHandler);

/* popup-image */
popupImageCloseButton.addEventListener('click', closePopupImage);
popupImageElement.addEventListener('click', closePopupImageByClickOnOverlay);

/* popup-elements */
profileAddButton.addEventListener('click', openPopupElements);
popupElementsCloseButton.addEventListener('click', closePopupElements);
popupElementsElement.addEventListener('click', closePopupElementsByClickOnOverlay);
popupElementsFormElement.addEventListener('submit', formElementsSubmitHandler);



