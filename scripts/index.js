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

/* elements */
const elementsList = document.querySelector('.elements__list');

/* template */
const elementsTemplate = document.querySelector('#elements-template').content.querySelector('.elements__list-item');



/******************** function ***********************/

/****************** test-function **************/


const openPopup = function (popup) {
  popup.classList.add('open');
  //popup.classList.add('popup-elements_is-opened');
 }

 openPopup(popupElementsElement);




/* create-new-element */
const createNewElement = function () {
  const elementsListItem = elementsTemplate.cloneNode(true);
  const elementsListItemName = elementsListItem.querySelector('.elements__name');
  const elementsListItemImage = elementsListItem.querySelector('.elements__image');
  const elementsDeleteButton = elementsListItem.querySelector('.elements__delete-button');
  const elementsLikeButton = elementsListItem.querySelector('.elements__like-button');
  const elementsOpenBigImage = elementsListItem.querySelector('.elements__image');

  elementsListItemName.textContent = '';
  elementsListItemImage.src = '';
  elementsListItemImage.alt = '';

  const handleElementsDeleteButtonClick = function (evt) {
    evt.target.closest('.elements__list-item').remove();
  };

  const handleElementslikeButtonClick = function (evt) {
    evt.target.classList.toggle('elements__like-button_active');
  };

  const handleElementsOpenBigImageClick = function (evt) {
    popupImageElement.classList.add('popup-image_is-opened');

    popupImageElementImg.src = elementsListItemImage.src;
    if (elementsListItemImage.alt === '') {
      popupImageElementImg.alt = elementsListItemName.textContent;
    }
    else {
      popupImageElementImg.alt = elementsListItemImage.alt;
    }
    popupImageElementCaption.textContent = elementsListItemName.textContent;
  };

  elementsDeleteButton.addEventListener('click', handleElementsDeleteButtonClick);
  elementsLikeButton.addEventListener('click', handleElementslikeButtonClick);
  elementsOpenBigImage.addEventListener('click', handleElementsOpenBigImageClick);

  return elementsListItem;
}

/* create-initial-element */
const createInitialElement = function (item) {
  const InitialElement = createNewElement();
  const elementsListItemName = InitialElement.querySelector('.elements__name');
  const elementsListItemImage = InitialElement.querySelector('.elements__image');

  elementsListItemName.textContent = item.name;;
  elementsListItemImage.src = item.link;
  elementsListItemImage.alt = item.alt;

  return InitialElement;
}

initialElements.forEach(function (item) {
  const element = createInitialElement(item);
  elementsList.append(element);
});


/* popup-elements */
const openPopupElements = function () {
  popupElementsElement.classList.add('popup-elements_is-opened');
}

const closePopupElements = function () {
  popupElementsElement.classList.remove('popup-elements_is-opened');
}

const createAddElement = function () {
  const AddElement = createNewElement();
  const elementsListItemName = AddElement.querySelector('.elements__name');
  const elementsListItemImage = AddElement.querySelector('.elements__image');

  elementsListItemName.textContent = popupElementsElementName.value;
  elementsListItemImage.src = popupElementsElementLink.value;
  elementsListItemImage.alt = popupElementsElementName.value;

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
  popupProfileElement.classList.add('popup-profile_is-opened');
  popupProfileElementName.value = profileName.textContent;
  popupProfileElementActivity.value = profileActivity.textContent;
}

const closePopupProfile = function () {
  popupProfileElement.classList.remove('popup-profile_is-opened');
}

const formProfileSubmitHandler = function (evt) {
  evt.preventDefault();
  profileName.textContent = popupProfileElementName.value;
  profileActivity.textContent = popupProfileElementActivity.value;
  closePopupProfile();
}

/* popup-image */
const closePopupImage = function () {
  popupImageElement.classList.remove('popup-image_is-opened');
}



/********************  event ********************/
/* popup-profile */
profileEditButton.addEventListener('click', openPopupProfile);
popupProfileCloseButton.addEventListener('click', closePopupProfile);
popupProfileFormElement.addEventListener('submit', formProfileSubmitHandler);

/* popup-image */
popupImageCloseButton.addEventListener('click', closePopupImage);

/* popup-elements */
profileAddButton.addEventListener('click', openPopupElements);
popupElementsCloseButton.addEventListener('click', closePopupElements);
popupElementsFormElement.addEventListener('submit', formElementsSubmitHandler);



