import {enableValidation, toggleButtonState} from './validate.js';
import {addToContainer} from './card.js';
import {openPopup, closePopup, hideFormErrors} from './utils.js';
import {closePopupByOverlayAndIcon} from './modal.js';
import {handleError, getCards, getUser, updateUserInfo, addCard, updateUserAvatar} from './api.js';
import '../pages/index.css';

const profileElement = document.querySelector('.profile');
const profileNameElement = profileElement.querySelector('.profile__name');
const profileDescElement = profileElement.querySelector('.profile__desc');
const profileImgElement = profileElement.querySelector('.profile__avatar');
const profileEditBtn = profileElement.querySelector('.profile__edit-button');

const profileEditPopup = document.querySelector('#popup_profile-edit');
const profileEditForm = profileEditPopup.querySelector('.form[name=profile-edit]');
const profileInputName = profileEditForm.querySelector('#profile-name');
const profileInputDesc = profileEditForm.querySelector('#profile-desc');
const profileSubmitBtn = profileEditForm.querySelector('.form__button');

const avatarEditBtn = profileElement.querySelector('.profile__avatar-edit-button');
const avatarEditPopup = document.querySelector('#popup_avatar-edit');
const avatarEditForm = avatarEditPopup.querySelector('form[name=avatar-edit]');
const avatarInputLink = avatarEditForm.querySelector('#avatar-link');
const avatarSubmitBtn = avatarEditForm.querySelector('.form__button');

const placeAddBtn = profileElement.querySelector('.profile__add-button');
const placeAddPopup = document.querySelector('#popup_place-add');
const placeAddForm = placeAddPopup.querySelector('.form[name=place-add]');
const placeInputName = placeAddForm.querySelector('#place-name');
const placeInputLink = placeAddForm.querySelector('#place-link');
const placeSubmitBtn = placeAddForm.querySelector('.form__button');

const placesGrid = document.querySelector('.places__grid');

const popups = document.querySelectorAll('.popup');

const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inputErrorMsgSelector: '.form__input-error',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input_invalid',
}

const cardConfig = {
  templateSelector: '#place-template',
  cardElementSelector: '.place',
  cardTitleSelector: '.place__name',
  cardImgSelector: '.place__photo',
  cardLikeSelector: '.place__like-button',
  cardDeleteSelector: '.place__delete-button',
  likeActiveClass: 'place__like-button_active',
  likeCounterSelector: '.place__like-counter',
  deleteButtonHiddenClass: 'place__delete-button_hidden',
}

let myId = '';

function renderUserInfo(name, desc) {
  profileNameElement.textContent = name;
  profileDescElement.textContent = desc;
}

function renderUser(name, desc, avatar) {
  renderUserInfo(name, desc);
  profileImgElement.setAttribute('src', avatar);
}

function renderLoading(isLoading, submitButton, defaultBtnText = 'Сохранить'){
  submitButton.textContent = isLoading ? 'Сохранение...' : defaultBtnText;
}

// function handlePopupAfterSuccess(popup, popupForm, popupFormSubmitBtn, configValidation, defaultBtnText='Сохранить') {
//   closePopup(popup);

//   toggleButtonState(popupFormSubmitBtn, configValidation.inactiveButtonClass, popupForm);
// }

function addCardByForm(evt) {
  evt.preventDefault();
  renderLoading(true, placeSubmitBtn, 'Создать');

  const cardPlaceName = placeInputName.value;
  const cardPlaceLink = placeInputLink.value;

  addCard(cardPlaceName, cardPlaceLink)
    .then((card) => {
      addToContainer(placesGrid, card, cardConfig, myId, myId);
      closePopup(placeAddPopup);
      placeAddForm.reset();
      toggleButtonState(placeSubmitBtn, validationConfig.inactiveButtonClass, placeAddForm);
    })
    .catch(handleError)
    .finally(() => {
      renderLoading(false, placeSubmitBtn, 'Создать');
    });
}

function editProfile(evt) {
  evt.preventDefault();
  renderLoading(true, profileSubmitBtn);

  const inputName = profileInputName.value;
  const inputDesc = profileInputDesc.value;

  updateUserInfo(inputName, inputDesc)
    .then((user) => {
      renderUserInfo(user.name, user.about);
      closePopup(profileEditPopup);
      profileEditForm.reset();
      toggleButtonState(profileSubmitBtn, validationConfig.inactiveButtonClass, profileEditForm);
    })
    .catch(handleError)
    .finally(() => {
      renderLoading(false, profileSubmitBtn);
    });
}

function editAvatar(evt) {
  evt.preventDefault();
  renderLoading(true, avatarSubmitBtn);
  updateUserAvatar(avatarInputLink.value)
  .then(user => {
    profileImgElement.setAttribute('src', user.avatar);
    closePopup(avatarEditPopup);
    avatarEditForm.reset();
    toggleButtonState(avatarSubmitBtn, validationConfig.inactiveButtonClass, avatarEditForm);
  })
  .catch(handleError)
  .finally(() => {
    renderLoading(false, avatarSubmitBtn);
  });
}

getUser()
  .then((user) => {
    renderUser(user.name, user.about, user.avatar);
    myId = user._id;
  })
  .catch(handleError);

getCards()
 .then((cards) => {
    cards.forEach((card) => {
      addToContainer(placesGrid, card, cardConfig, myId, card.owner._id);
    });
  })
  .catch(handleError);

profileEditBtn.addEventListener('click', function() {
  profileInputName.value = profileNameElement.textContent;
  profileInputDesc.value = profileDescElement.textContent;
  hideFormErrors(profileEditForm, validationConfig);
  openPopup(profileEditPopup);
});

placeAddBtn.addEventListener('click', function() {
  // hideFormErrors(placeAddForm, validationConfig);
  openPopup(placeAddPopup);
});

avatarEditBtn.addEventListener('click', function () {
  // hideFormErrors(avatarEditForm, validationConfig);
  openPopup(avatarEditPopup)
});

placeAddForm.addEventListener('submit', addCardByForm);
profileEditForm.addEventListener('submit', editProfile);
avatarEditForm.addEventListener('submit', editAvatar);

popups.forEach((popup) => {
  popup.addEventListener('click', closePopupByOverlayAndIcon);
});

enableValidation(validationConfig);
