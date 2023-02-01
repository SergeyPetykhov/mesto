import { UserInfo } from './../scripts/UserInfo.js';
import { PopupWithImage } from './../scripts/PopupWithImage.js';
import { PopupWithForm } from './../scripts/PopupWithForm.js';
import { Section } from './../scripts/Section.js';
import { Card } from './../scripts/Card.js';
import { FormValidator } from './../scripts/FormValidator.js';

import { config } from './../scripts/config.js';
import { initialElements } from './../utils/cards.js';
import './index.css';


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

/* profileData */
const profileData = new UserInfo({ name: '.profile__name', about: '.profile__activity' });

/* popupImage */
const popupImage = new PopupWithImage('.popup-image');
popupImage.setEventListeners();

/* popupProfile */
const popupProfile = new PopupWithForm({
  handleSubmitForm: (inputFormData) => {
    const newUserData = { newName: inputFormData[0], newAbout: inputFormData[1] };
    profileData.setUserInfo(newUserData);
    popupProfile.close();
  }
}
  , '.popup-profile'
);
popupProfile.setEventListeners();

/* popupElements */
const popupElements = new PopupWithForm({
  handleSubmitForm: (inputFormData) => {
    const newImageData = { newImageName: inputFormData[0], newImageLink: inputFormData[1] };
    const newImageCard = createNewCard(newImageData.newImageName, newImageData.newImageLink, newImageData.newImageName, '#elements-template');
    renderCard.addItem(newImageCard);

    popupElements.close();
  }
}
  , '.popup-elements'
);
popupElements.setEventListeners();


/* formValidator popupProfile */
const popupProfileFormValidator = new FormValidator(config, '.popup-profile__form');
popupProfileFormValidator.enableValidation();

/* formValidator popupElements */
const popupElementsFormValidator = new FormValidator(config, '.popup-elements__form');
popupElementsFormValidator.enableValidation();



/******************** function ***********************/
/* open popup-elements */
const openPopupElements = function () {
  popupElementsFormValidator.changeButtonAvalible();
  popupElements.open();
}

/* open popup-profile */
const openPopupProfile = function () {
  const userdata = profileData.getUserInfo();
  popupProfileElementName.value = userdata.name;
  popupProfileElementActivity.value = userdata.about;

  popupProfileFormValidator.changeButtonAvalible();
  popupProfile.open();
}

/* create new card */
const createNewCard = function (name, src, alt, templateSelector) {
  const card = new Card({
    handleCardClick: () => {
      popupImage.open(name, src, alt);
    }
  }
    , name, src, alt, templateSelector);

  const cardElement = card.createCard();

  return cardElement;
}

/* render initial elements */
const renderCard = new Section({
  data: initialElements,
  renderer: (item) => {
    const newCard = createNewCard(item.name, item.link, item.name, '#elements-template');
    renderCard.addItem(newCard);
  }
},
  '.elements__list'
);

renderCard.renderItems();



/********************  event ********************/
/* popup-profile */
profileEditButton.addEventListener('click', openPopupProfile);

/* popup-elements */
profileAddButton.addEventListener('click', openPopupElements);


