import { UserInfo } from './../components/UserInfo.js';
import { PopupWithImage } from './../components/PopupWithImage.js';
import { PopupWithForm } from './../components/PopupWithForm.js';
import { Section } from './../components/Section.js';
import { Card } from './../components/Card.js';
import { FormValidator } from './../components/FormValidator.js';
import { Api } from './../components/Api.js';
import { config } from './../scripts/config.js';
import './index.css';
import { PopupDeleteConfirm } from './../components/PopupDeleteConfirm.js';

/******************** variable *******************/
/* profile  */
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');
const profileAvatar = document.querySelector('.profile__avatar');
const profileAvatarSection = document.querySelector('.profile__avatar-section');

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

/* userId */
let profileId = undefined;

/* initialCards */
let initialCards = {};

/******************** class *******************/
/* api */
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: '26a361d2-5544-4967-a67c-9f781c38c119',
    'Content-Type': 'application/json'
  }
});

/* profileData */
const profileData = new UserInfo({ name: '.profile__name', about: '.profile__activity' });

/* userData & cards*/
Promise.all([api.getUserData(), api.getInitialCards()])
  .then((res) => {
    initialCards = { cards: res[1] };
    const userData = { name: res[0].name, about: res[0].about };
    profileData.setUserInfo(userData);
    profileId = res[0]._id;
    profileAvatar.src = res[0].avatar;
    renderCard.renderItems(initialCards.cards);
  })
  .catch((err) => {
    console.log(err);
  });

/* popupImage */
const popupImage = new PopupWithImage('.popup-image');
popupImage.setEventListeners();

/* popupAvatar */
const popupAvatar = new PopupWithForm({
  handleSubmitForm: (inputFormData) => {
    popupAvatar.setSaveButtonText('Сохранение...');
    sleep(1000).then(() => {
      const newAvatarUrl = { avatarUrl: inputFormData[0] };
      Promise.all([api.updateUserAvatar(newAvatarUrl)])
        .then(() => {
          profileAvatar.src = newAvatarUrl.avatarUrl;
          popupAvatar.close();
          popupAvatar.setSaveButtonText('Сохранить');
        })
        .catch((err) => {
          console.log(err);
        })
    });
  }
}
  , '.popup-avatar'
);
popupAvatar.setEventListeners();

/* popupProfile */
const popupProfile = new PopupWithForm({
  handleSubmitForm: (inputFormData) => {
    popupProfile.setSaveButtonText('Сохранение...');
    sleep(1000).then(() => {
      const newUserData = { name: inputFormData[0], about: inputFormData[1] };
      Promise.all([api.updateUserData(newUserData)])
        .then(() => {
          profileData.setUserInfo(newUserData);
          popupProfile.close();
          popupProfile.setSaveButtonText('Сохранить');
        })
        .catch((err) => {
          console.log(err);
        })
    });
  }
}
  , '.popup-profile'
);
popupProfile.setEventListeners();

/* popupElements */
const popupElements = new PopupWithForm({
  handleSubmitForm: (inputFormData) => {
    popupElements.setSaveButtonText('Сохранение...');
    sleep(1000).then(() => {
      const newImageData = { newImageName: inputFormData[0], newImageLink: inputFormData[1] };
      Promise.all([api.postNewCard(newImageData)])
        .then((result) => {
          const newImageCard = createNewCard(result[0].name, result[0].link, result[0].name, '#elements-template', result[0]._id, result[0].owner._id, result[0].likes);
          renderCard.addNewItem(newImageCard);
          popupElements.close();
          popupElements.setSaveButtonText('Сохранить');
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
}
  , '.popup-elements'
);
popupElements.setEventListeners();

/* popupDeleteElements */
const popupDeleteElements = new PopupDeleteConfirm({
  handleSubmitForm: (card) => {
    api.deleteCard(card._cardId)
      .then(() => {
        card.deleteCard();
        popupDeleteElements.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
  , '.popup-delete-elements'
);
popupDeleteElements.setEventListeners();

/* formValidator popupProfile */
const popupAvatarFormValidator = new FormValidator(config, '.popup-avatar__form');
popupAvatarFormValidator.enableValidation();

/* formValidator popupProfile */
const popupProfileFormValidator = new FormValidator(config, '.popup-profile__form');
popupProfileFormValidator.enableValidation();

/* formValidator popupElements */
const popupElementsFormValidator = new FormValidator(config, '.popup-elements__form');
popupElementsFormValidator.enableValidation();

/******************** function ***********************/
/* sleep */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/* open popup-avatar */
const openPopupAvatar = function () {
  popupAvatarFormValidator.removeValidationErrors();
  popupAvatarFormValidator.changeButtonAvalible();
  popupAvatar.open();
}

/* open popup-elements */
const openPopupElements = function () {
  popupElementsFormValidator.removeValidationErrors();
  popupElementsFormValidator.changeButtonAvalible();
  popupElements.open();
}

/* open popup-profile */
const openPopupProfile = function () {
  popupProfileFormValidator.removeValidationErrors();
  const userdata = profileData.getUserInfo();
  popupProfileElementName.value = userdata.name;
  popupProfileElementActivity.value = userdata.about;
  popupProfileFormValidator.changeButtonAvalible();
  popupProfile.open();
}

/* open popup-delete-elements */
const openDeletePopupElements = function (card) {
  popupDeleteElements.open();
  popupDeleteElements.getDeleteCard(card);
}

/* create new card */
const createNewCard = function (name, src, alt, templateSelector, cardId, ownerId, likes) {
  const card = new Card({
    handleCardClick: () => {
      popupImage.open(name, src, alt);
    },
    handleDeleteButtonClick: () => {
      openDeletePopupElements(card);
    },
    handleLikeButtonClick: () => {
      let likeCard = card.getLikeCard();

      if (!likeCard.isLiked) {
        api.likeCard(card._cardId)
          .then(() => {
            card.addLikeCard(likeCard.likeCount);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      else {
        api.dislikeCard(card._cardId)
          .then(() => {
            card.deleteLikeCard(likeCard.likeCount);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }
    , name, src, alt, templateSelector, cardId, ownerId, likes, profileId);

  const cardElement = card.createCard();
  const deleteButton = cardElement.querySelector('.elements__delete-button');

  if (ownerId != profileId) {
    deleteButton.classList.add('unvisible');
  }

  return cardElement;
}

/* rendercard create */
const renderCard = new Section({
  renderer: (item) => {
    const newCard = createNewCard(item.name, item.link, item.name, '#elements-template', item._id, item.owner._id, item.likes);
    renderCard.addItem(newCard);
  }
},
  '.elements__list'
);

/********************  event ********************/
/* open popup-avatar */
profileAvatarSection.addEventListener('click', openPopupAvatar);

/* open popup-profile */
profileEditButton.addEventListener('click', openPopupProfile);

/* open popup-elements */
profileAddButton.addEventListener('click', openPopupElements);



