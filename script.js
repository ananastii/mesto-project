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

// функции для управления модальными окнами
const toggleStatePopup = function(popup) {
  popup.classList.toggle('popup_opened');
}
const setHandlers = function(openBtn, closeBtn, popup){
  [openBtn, closeBtn].forEach(function(handler) {
    handler.addEventListener('click', function() {
      toggleStatePopup(popup);
    });
  });
}

// Открытие и закрытие popup для редактирования профиля
const profileEditPopup = document.querySelector('#popup_profile-edit');
const profileEditBtn = document.querySelector('.profile__edit-button');
const profileEditPopupCloseBtn = profileEditPopup.querySelector('.popup__close-button');

setHandlers(profileEditBtn, profileEditPopupCloseBtn, profileEditPopup);

// Открытие и закрытие popup для добавления места профиля
const placeAddPopup = document.querySelector('#popup_place-add');
const placeAddBtn = document.querySelector('.profile__add-button');
const placeAddPopupCloseBtn = placeAddPopup.querySelector('.popup__close-button');

setHandlers(placeAddBtn, placeAddPopupCloseBtn, placeAddPopup);
// Добавление карточки

const createPlaceCard = function(placeName, placeImgSrc) {
  const placeTemplate = document.querySelector('#place-template').content;
  const placeElement = placeTemplate.querySelector('.place').cloneNode(true);
  const placeTitleElement = placeElement.querySelector('.place__name');
  const placeImgElement = placeElement.querySelector('.place__photo');
  const placeLikeBtn = placeElement.querySelector('.place__like-button');
  const placeDeleteBtn = placeElement.querySelector('.place__delete-button');
  const placePopupElement = placeElement.querySelector('#popup_image-open');
  const placeImgFullElement = placePopupElement.querySelector('.popup__image');
  const placeCaptionElement = placePopupElement.querySelector('.popup__caption');
  const placePopupCloseBtn = placePopupElement .querySelector('.popup__close-button');

  placeTitleElement.textContent = placeName;
  placeImgElement.setAttribute('src', placeImgSrc);
  placeImgElement.setAttribute('alt', placeName);
  placeCaptionElement.textContent = placeName;
  placeImgFullElement.setAttribute('src', placeImgSrc);
  placeImgFullElement.setAttribute('alt', placeName);

  placeLikeBtn.addEventListener('click', function (evt) {
    evt.target.classList.toggle('place__like-button_active');
  });

  placeDeleteBtn.addEventListener('click', function () {
    placeElement.remove()
  });

  setHandlers(placeImgElement, placePopupCloseBtn, placePopupElement);

  return placeElement;
}

const addToContainer = function(container, name, link) {
  const card = createPlaceCard(name, link);
  container.prepend(card);
}

const placesGrid = document.querySelector('.places__grid');

// Добавление начальных карточек
initialCards.forEach((card) => {
  addToContainer(placesGrid, card.name, card.link);
});

// добавление карточек в форме

const addCardForm = document.querySelector('.form[name=place-add]');

const addCardByForm = function(evt) {
  evt.preventDefault();

  const inputPlaceName = evt.target.querySelector('#place-name').value;
  const inputPlaceLink = evt.target.querySelector('#place-link').value;

  addToContainer(placesGrid, inputPlaceName,inputPlaceLink);

  evt.target.reset();
}

addCardForm.addEventListener('submit', addCardByForm);

// Изменение профиля
const editProfileForm = document.querySelector('.form[name=profile-edit]');
const profileElement = document.querySelector('.profile');
const profileNameElement = profileElement.querySelector('.profile__name');
const profileDescElement = profileElement.querySelector('.profile__desc');

const editProfile = function(evt) {
  evt.preventDefault();

  const inputNameElement = evt.target.querySelector('#profile-name');
  const inputName = inputNameElement.value
  const inputDescElement = evt.target.querySelector('#profile-desc');
  const inputDesc = inputDescElement.value

  inputNameElement.setAttribute('value', inputName);
  profileNameElement.textContent = inputName;
  inputDescElement.setAttribute('value', inputDesc);
  profileDescElement.textContent = inputDesc;

  evt.target.reset();
}

editProfileForm.addEventListener('submit', editProfile);
