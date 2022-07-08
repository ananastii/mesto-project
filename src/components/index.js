import '../pages/index.css';
import { enableValidation } from './validate';
import { addToContainer } from './card';
import { openPopup, closePopupByOverlayAndIcon } from './modal';
import {
  hideFormErrors,
  renderLoading,
  handlePopupOnResponce
} from './utils.js';
import {
  handleError,
  getCards,
  getUserInfo,
  updateUserInfo,
  addCard,
  updateUserAvatar
} from './api.js';
import {
  validationConfig,
  cardConfig,
  formConfig,
  profileConfig,
  popupEditProfileConfig,
  popupEditAvatarConfig,
  popupAddPlaceConfig,
  modalConfig,
  cardsFeedConfig
  } from './constants';

const profileElement = document.querySelector(profileConfig.elemSelector);
const profileNameElement = profileElement.querySelector(profileConfig.nameSelector);
const profileDescElement = profileElement.querySelector(profileConfig.descSelector);
const profileImgElement = profileElement.querySelector(profileConfig.avatarSelector);
const profileEditBtn = profileElement.querySelector(profileConfig.btnEditInfoSelector);
const avatarEditBtn = profileElement.querySelector(profileConfig.btnEditImgSelector);

const profileEditPopup = document.querySelector(popupEditProfileConfig.popupSelector);
const profileEditForm = profileEditPopup.querySelector(popupEditProfileConfig.formSelector);
const profileInputName = profileEditForm.querySelector(popupEditProfileConfig.inputNameSelector);
const profileInputDesc = profileEditForm.querySelector(popupEditProfileConfig.inputDescSelector);
const profileSubmitBtn = profileEditForm.querySelector(formConfig.submitBtnSelector);

const avatarEditPopup = document.querySelector(popupEditAvatarConfig.popupSelector);
const avatarEditForm = avatarEditPopup.querySelector(popupEditAvatarConfig.formSelector);
const avatarInputLink = avatarEditForm.querySelector(popupEditAvatarConfig.inputLinkSelector);
const avatarSubmitBtn = avatarEditForm.querySelector(formConfig.submitBtnSelector);

const placeAddBtn = profileElement.querySelector(cardsFeedConfig.btnAddCardSelector);

const placeAddPopup = document.querySelector(popupAddPlaceConfig.popupSelector);
const placeAddForm = placeAddPopup.querySelector(popupAddPlaceConfig.formSelector);
const placeInputName = placeAddForm.querySelector(popupAddPlaceConfig.inputNameSelector);
const placeInputLink = placeAddForm.querySelector(popupAddPlaceConfig.inputLinkSelector);
const placeSubmitBtn = placeAddForm.querySelector(formConfig.submitBtnSelector);

const placesGrid = document.querySelector(cardsFeedConfig.containerSelector);

const popups = document.querySelectorAll(modalConfig.modalSelector);

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
  renderLoading(true, placeSubmitBtn, 'Создать');

  const cardPlaceName = placeInputName.value;
  const cardPlaceLink = placeInputLink.value;

  addCard(cardPlaceName, cardPlaceLink)
    .then((card) => {
      addToContainer(placesGrid, card, cardConfig, myId, myId);
      handlePopupOnResponce(placeAddPopup, placeAddForm, placeSubmitBtn, validationConfig.inactiveButtonClass)
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
      handlePopupOnResponce(profileEditPopup, profileEditForm, profileSubmitBtn, validationConfig.inactiveButtonClass)
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
    handlePopupOnResponce(avatarEditPopup, avatarEditForm, avatarSubmitBtn, validationConfig.inactiveButtonClass)
  })
  .catch(handleError)
  .finally(() => {
    renderLoading(false, avatarSubmitBtn);
  });
}

Promise.all([getUserInfo(), getCards()])
  .then(([userData, cards]) => {
    myId = userData._id;
    renderUser(userData.name, userData.about, userData.avatar);
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
  hideFormErrors(placeAddForm, validationConfig);
  openPopup(placeAddPopup);
});

avatarEditBtn.addEventListener('click', function () {
  hideFormErrors(avatarEditForm, validationConfig);
  openPopup(avatarEditPopup)
});

placeAddForm.addEventListener('submit', addCardByForm);
profileEditForm.addEventListener('submit', editProfile);
avatarEditForm.addEventListener('submit', editAvatar);

popups.forEach((popup) => {
  popup.addEventListener('click', closePopupByOverlayAndIcon);
});

enableValidation(validationConfig);
