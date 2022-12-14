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
  const popupIsOpen = document.querySelector('.popup_is-opened');

  if (evt.key === keyClosePopup) {
    closePopup(popupIsOpen);
  }
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
initialElements.forEach(function (item) {
  const element = createNewElement(item.name, item.link, item.alt);
  elementsList.append(element);
});

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

  const addElement = createNewElement(popupElementsElementName.value, popupElementsElementLink.value, popupElementsElementName.value);
  elementsList.prepend(addElement);

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



