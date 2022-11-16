/***** variable *****/

/* profile */
const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');

/* popup */
const popupElement = document.querySelector('.popup');
const formElement = popupElement.querySelector('.form__profile');
const closePopupButton = popupElement.querySelector('.popup__close-button');
const popupElementName = popupElement.querySelector('.form__item_el_name');
const popupElementActivity = popupElement.querySelector('.form__item_el_activity');

/***** function *****/
const openPopup = function () {
  popupElement.classList.add('popup_is-opened');
  popupElementName.value = profileName.textContent;
  popupElementActivity.value = profileActivity.textContent;
}

const closePopup = function () {
  popupElement.classList.remove('popup_is-opened');
}

/* submit form */
const formSubmitHandler = function (evt) {
  evt.preventDefault();
  profileName.textContent = popupElementName.value;
  profileActivity.textContent = popupElementActivity.value;
  closePopup ();
}

/***** event *****/
editButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);

