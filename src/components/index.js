import {enableValidation, toggleButtonState} from './validate.js';
import {addToContainer} from './card.js';
import {openPopup, closePopup, hideFormErrors} from './utils.js';
import {closePopupByOverlayAndIcon} from './modal.js';
import {getCards} from './api.js';
import '../pages/index.css';

const profileElement = document.querySelector('.profile');
const profileNameElement = profileElement.querySelector('.profile__name');
const profileDescElement = profileElement.querySelector('.profile__desc');
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
  likeActiveClass: 'place__like-button_active'
}

function addCardByForm(evt) {
  evt.preventDefault();

  const cardPlaceName = placeInputName.value;
  const cardPlaceLink = placeInputLink.value;

  addToContainer(placesGrid, cardPlaceName, cardPlaceLink, cardConfig);

  closePopup(placeAddPopup);
  evt.target.reset();
  toggleButtonState(placeSubmitBtn, validationConfig.inactiveButtonClass, placeAddForm);
}

function editProfile(evt) {
  evt.preventDefault();

  const inputName = profileInputName.value
  const inputDesc = profileInputDesc.value

  profileNameElement.textContent = inputName;
  profileDescElement.textContent = inputDesc;

  closePopup(profileEditPopup);
}

getCards()
 .then((cards) => {
    cards.forEach((card) => {
      addToContainer(placesGrid, card.name, card.link, cardConfig);
    });
  })

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
