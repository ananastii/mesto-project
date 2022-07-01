import enableValidation from './validate.js';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
  ];

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

const placePopupElement = document.querySelector('#popup_image-open');
const placePopupImg = placePopupElement.querySelector('.popup__image');
const placePopupCaption = placePopupElement.querySelector('.popup__caption');

const placesGrid = document.querySelector('.places__grid'); // оставим?

const popups = document.querySelectorAll('.popup');

const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inputErrorMsgSelector: '.form__input-error',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input_invalid',
}


// закрытие popup по esc
const keyHandler = (evt) => {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    if (activePopup) {
      closePopup(activePopup);
    }
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keyHandler);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyHandler);
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


function createPlaceCard(placeName, placeImgSrc, config) {
  const placeTemplate = document.querySelector(config.templateSelector).content;
  const placeElement = placeTemplate.querySelector(config.cardElementSelector).cloneNode(true);
  const placeTitleElement = placeElement.querySelector(config.cardTitleSelector);
  const placeImgElement = placeElement.querySelector(config.cardImgSelector);
  const placeLikeBtn = placeElement.querySelector(config.cardLikeSelector);
  const placeDeleteBtn = placeElement.querySelector(config.cardDeleteSelector);

  placeTitleElement.textContent = placeName;
  placeImgElement.setAttribute('src', placeImgSrc);
  placeImgElement.setAttribute('alt', placeName);

  placeLikeBtn.addEventListener('click', function (evt) {
    evt.target.classList.toggle(config.likeActiveClass);
  });

  placeDeleteBtn.addEventListener('click', function () {
    placeElement.remove();
  });

  placeImgElement.addEventListener('click', function(){
    placePopupImg.setAttribute('src', placeImgSrc);
    placePopupImg.setAttribute('alt', placeName);
    placePopupCaption.textContent = placeName;
    openPopup(placePopupElement);
  });

  return placeElement;
}

function addToContainer(container, name, link, config) {
  const card = createPlaceCard(name, link, config);
  container.prepend(card);
}

function addCardByForm(evt) {
  evt.preventDefault();

  const cardPlaceName = placeInputName.value;
  const cardPlaceLink = placeInputLink.value;

  addToContainer(placesGrid, cardPlaceName, cardPlaceLink, cardConfig);

  closePopup(placeAddPopup);
  evt.target.reset();
}

function editProfile(evt) {
  evt.preventDefault();

  const inputName = profileInputName.value
  const inputDesc = profileInputDesc.value

  profileInputName.setAttribute('value', inputName);
  profileNameElement.textContent = inputName;
  profileInputDesc.setAttribute('value', inputDesc);
  profileDescElement.textContent = inputDesc;

  closePopup(profileEditPopup);
  evt.target.reset();
}

initialCards.forEach((card) => {
  addToContainer(placesGrid, card.name, card.link, cardConfig);
});

profileEditBtn.addEventListener('click', function() {
  profileInputName.value = profileNameElement.textContent;
  profileInputDesc.value = profileDescElement.textContent;
  hideFormErrors(profileEditForm, validationConfig.inputErrorMsgSelector);
  openPopup(profileEditPopup);
});

placeAddBtn.addEventListener('click', function() {
  hideFormErrors(placeAddForm, validationConfig.inputErrorMsgSelector);
  openPopup(placeAddPopup);
});

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close-button') ||
      evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
  })
});

placeAddForm.addEventListener('submit', addCardByForm);
profileEditForm.addEventListener('submit', editProfile);


const hideFormErrors = (formElement, inputErrorMsgSelector) => {
  const formErrors = formElement.querySelectorAll(inputErrorMsgSelector);
  formErrors.forEach(error => error.textContent = '');
}

enableValidation(validationConfig);
