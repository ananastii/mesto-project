import {enableValidation, toggleButtonState} from './validate.js';
import {addToContainer} from './card.js';
import {openPopup, closePopup, hideFormErrors} from './utils.js';
import {closePopupByOverlayAndIcon} from './modal.js';
import {onError, getCards, getUser, updateUserInfo, addCard, deleteCard} from './api.js';
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

const placeAddBtn = profileElement.querySelector('.profile__add-button');
const placeAddPopup = document.querySelector('#popup_place-add');
const placeAddForm = placeAddPopup.querySelector('.form[name=place-add]');
const placeInputName = placeAddForm.querySelector('#place-name');
const placeInputLink = placeAddForm.querySelector('#place-link');
const placeSubmitBtn = placeAddForm.querySelector('.form__button')

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

function addCardByForm(evt) {
  evt.preventDefault();

  const cardPlaceName = placeInputName.value;
  const cardPlaceLink = placeInputLink.value;

  addCard(cardPlaceName, cardPlaceLink)
    .then((card) => {
      addToContainer(placesGrid, card, cardConfig, myId, myId);
    })
    .catch(onError);

  closePopup(placeAddPopup);
  evt.target.reset();
  toggleButtonState(placeSubmitBtn, validationConfig.inactiveButtonClass, placeAddForm);
}

function editProfile(evt) {
  evt.preventDefault();

  const inputName = profileInputName.value;
  const inputDesc = profileInputDesc.value;

  updateUserInfo(inputName, inputDesc)
    .then((user) => {
      renderUserInfo(user.name, user.about);
    })
    .catch(onError);
  closePopup(profileEditPopup);
}

getUser()
  .then((user) => {
    renderUser(user.name, user.about, user.avatar);
    myId = user._id;
  })
  .catch(onError);

getCards()
 .then((cards) => {
    cards.forEach((card) => {
      addToContainer(placesGrid, card, cardConfig, myId, card.owner._id);
    });
  })
  .catch(onError);

profileEditBtn.addEventListener('click', function() {
  profileInputName.value = profileNameElement.textContent;
  profileInputDesc.value = profileDescElement.textContent;
  hideFormErrors(profileEditForm, validationConfig);
  openPopup(profileEditPopup);
});


popups.forEach((popup) => {
  popup.addEventListener('click', closePopupByOverlayAndIcon);
});

placeAddBtn.addEventListener('click', function() {
  openPopup(placeAddPopup);
});

placeAddForm.addEventListener('submit', addCardByForm);
profileEditForm.addEventListener('submit', editProfile);

enableValidation(validationConfig);
