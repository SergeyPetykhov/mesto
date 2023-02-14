import { UserInfo } from './../scripts/UserInfo.js';
import { PopupWithImage } from './../scripts/PopupWithImage.js';
import { PopupWithForm } from './../scripts/PopupWithForm.js';
import { Section } from './../scripts/Section.js';
import { Card } from './../scripts/Card.js';
import { FormValidator } from './../scripts/FormValidator.js';
import { Api } from './../scripts/Api.js';
import { config } from './../scripts/config.js';
import './index.css';
import { PopupDeleteConfirm } from '../scripts/PopupDeleteConfirm.js';



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



/******************** class *******************/
/* api */
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
    'Content-Type': 'application/json'
  }
});

/* userData & cards*/
Promise.all([api.getUserData(), api.getInitialCards()])
  .then((res) => {
    profileId = res[0]._id;
    profileName.textContent = res[0].name;
    profileActivity.textContent = res[0].about;
    profileAvatar.src = res[0].avatar;
    renderCard.renderItems(res[1]);
  })
  .catch((err) => {
    console.log(err);
  });


/* profileData */
const profileData = new UserInfo({ name: '.profile__name', about: '.profile__activity' });

/* popupImage */
const popupImage = new PopupWithImage('.popup-image');
popupImage.setEventListeners();

/* popupAvatar */
const popupAvatar = new PopupWithForm({
  handleSubmitForm: (inputFormData) => {
    const newAvatarUrl = { avatarUrl: inputFormData[0] };
    popupAvatar.setSaveButtonText('Сохранение...');
    Promise.all([api.updateUserAvatar(newAvatarUrl)])
      .then(() => {
        profileAvatar.src = newAvatarUrl.avatarUrl
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAvatar.setSaveButtonText('Сохранить');
      });
    popupAvatar.close();
  }
}
  , '.popup-avatar'
);
popupAvatar.setEventListeners();

/* popupProfile */
const popupProfile = new PopupWithForm({
  handleSubmitForm: (inputFormData) => {
    const newUserData = { newName: inputFormData[0], newAbout: inputFormData[1] };
    popupProfile.setSaveButtonText('Сохранение...');
    Promise.all([api.updateUserData(newUserData)])
      .then(() => {
        profileData.setUserInfo(newUserData);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupProfile.setSaveButtonText('Сохранить');
      });
    popupProfile.close();
  }
}
  , '.popup-profile'
);
popupProfile.setEventListeners();

/* popupElements */
const popupElements = new PopupWithForm({
  handleSubmitForm: (inputFormData) => {
    popupElements.setSaveButtonText('Сохранение...');
    const newImageData = { newImageName: inputFormData[0], newImageLink: inputFormData[1] };
    Promise.all([api.postNewCard(newImageData)])
      .then((result) => {
        const newImageCard = createNewCard(result[0].name, result[0].link, result[0].name, '#elements-template', result[0]._id, result[0].owner._id, result[0].likes);
        renderCard.addItem(newImageCard);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupElements.setSaveButtonText('Сохранить');
      });

    popupElements.close();
  }
}
  , '.popup-elements'
);
popupElements.setEventListeners();

/* popupDeleteElements */
const PopupDeleteElements = new PopupDeleteConfirm({
  handleSubmitForm: (card) => {
    api.deleteCard(card._cardId)
      .then(() => {
        card.deleteCard();
        PopupDeleteElements.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
  , '.popup-delete-elements'
);
PopupDeleteElements.setEventListeners();



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
/* open popup-avatar */
const openPopupAvatar = function () {
  popupAvatarFormValidator.changeButtonAvalible();
  popupAvatar.open();
}

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

/* open popup-delete-elements */
const openDeletePopupElements = function (card) {
  PopupDeleteElements.open();
  PopupDeleteElements.getDeleteCard(card);
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
      let isLiked = false;
      let likesCounter = 0;
      api.getInitialCards()
        .then((result) => {
          result.forEach(element => {
            if (element._id == card._cardId) {
              likesCounter = element.likes.length;
              element.likes.forEach(like => {
                if (like._id == profileId) {
                  isLiked = true;
                }
              });
            }
          });

          if (!isLiked) {
            api.likeCard(card._cardId)
              .then(() => {
                card.addLikeCard(likesCounter);
              })
              .catch((err) => {
                console.log(err);
              });
          }
          else {
            api.dislikeCard(card._cardId)
              .then(() => {
                card.deleteLikeCard(likesCounter);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
    , name, src, alt, templateSelector, cardId, ownerId, likes);

  const cardElement = card.createCard();
  const deleteButton = cardElement.querySelector('.elements__delete-button');

  if (ownerId != profileId) {
    deleteButton.classList.add('unvisible');
  }

  return cardElement;
}

/* rendercard create */
const renderCard = new Section({
  //data: initialElements,
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



