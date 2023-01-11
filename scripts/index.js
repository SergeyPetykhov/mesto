import { Card } from './card.js';
import { FormValidator } from './formValidator.js';



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
export const popupImageElement = document.querySelector('.popup-image');
export const popupImageCloseButton = popupImageElement.querySelector('.popup-image__close-button');
export const popupImageElementImg = popupImageElement.querySelector('.popup-image__img');
export const popupImageElementCaption = popupImageElement.querySelector('.popup-image__figcaption');

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
export const openPopup = function (popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupByKeydownKeyClosePopup);
}

const closePopup = function (popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupByKeydownKeyClosePopup);
}

/* close popup keydown keyClosePopup */
const closePopupByKeydownKeyClosePopup = function (evt) {
  const popupIsOpen = document.querySelector('.popup_is-opened');

  if (evt.key === keyClosePopup) {
    closePopup(popupIsOpen);
  }
}

/* clear popups form */
const clearPopupForm = function (popup, config) {
  const form = popup.querySelector(config.formSelector);
  const inputs = popup.querySelectorAll(config.inputSelector);
  const errors = popup.querySelectorAll(config.errorSelector);

  form.reset();

  inputs.forEach(function (input) {
    input.classList.remove(config.inputErrorClass);
  });

  errors.forEach(function (error) {
    error.textContent = '';
    error.classList.remove(config.errorClass);
  });
}

/* popups change availible button */
const enableSubmitButton = function (button, config) {
  button.classList.remove(config.inactiveButtonClass);
  button.classList.add(config.activeButtonClass);
  button.disabled = false;
}

const disableSubmitButton = function (button, config) {
  button.classList.remove(config.activeButtonClass);
  button.classList.add(config.inactiveButtonClass);
  button.disabled = true;
}

/* popup-elements */
const openPopupElements = function () {
  disableSubmitButton(popupElementsElementSaveButton, config);
  openPopup(popupElementsElement);
}

const closePopupElements = function () {
  closePopup(popupElementsElement);
  clearPopupForm(popupElementsElement, config);
}

const closePopupElementsByClickOnOverlay = function (evt) {
  if (evt.target === evt.currentTarget) {
    closePopupElements();
  }
}

const formElementsSubmitHandler = function (evt) {
  evt.preventDefault();

  const card = new Card(popupElementsElementName.value, popupElementsElementLink.value, popupElementsElementName.value, '#elements-template');
  const cardElement = card.createCard();
  elementsList.prepend(cardElement);

  closePopupElements();
}

/* popup-profile */
const openPopupProfile = function () {
  popupProfileElementName.value = profileName.textContent;
  popupProfileElementActivity.value = profileActivity.textContent;
  popupProfileElementSaveButton.disabled = true;

  if (popupProfileElementName.value && popupProfileElementActivity.value) {
    enableSubmitButton(popupProfileElementSaveButton, config)
  }

  openPopup(popupProfileElement);
}

const closePopupProfile = function () {
  closePopup(popupProfileElement);
  clearPopupForm(popupProfileElement, config);
}

const closePopupProfileByClickOnOverlay = function (evt) {
  if (evt.target === evt.currentTarget) {
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
  if (evt.target === evt.currentTarget) {
    closePopupImage();
  }
}



/* create initial elements */
initialElements.forEach(function (item) {
  const card = new Card(item.name, item.link, item.alt, '#elements-template');
  const cardElement = card.createCard();
  elementsList.append(cardElement);
});

/* create formValidator */
const popupProfileFormValidator = new FormValidator(config, '.popup-profile__form');
popupProfileFormValidator.enableValidation();

const popupElementsFormValidator = new FormValidator(config, '.popup-elements__form');
popupElementsFormValidator.enableValidation();



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



