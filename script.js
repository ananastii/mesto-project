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

const createPlaceCard = function(data) {
  const placeName = data.name;
  const placeImgSrc = data.link;
  const placeTemplate = document.querySelector('#place-template').content;
  const placeElement = placeTemplate.querySelector('.place').cloneNode(true);
  const placeTitle = placeElement.querySelector('.place__name');
  const placeImg = placeElement.querySelector('.place__photo');
  const placeLikeBtn = placeElement.querySelector('.place__like-button');
  const placeDeleteBtn = placeElement.querySelector('.place__delete-button');
  const placePopup = placeElement.querySelector('#popup_image-open');
  const placeImgFull = placePopup.querySelector('.popup__image');
  const placeCaption = placePopup.querySelector('.popup__caption');
  const placePopupCloseBtn = placePopup.querySelector('.popup__close-button');

  placeTitle.textContent = placeName;
  placeImg.setAttribute('src', placeImgSrc);
  placeImg.setAttribute('alt', placeName);
  placeCaption.textContent = placeName;
  placeImgFull.setAttribute('src', placeImgSrc);
  placeImgFull.setAttribute('alt', placeName);

  placeLikeBtn.addEventListener('click', function (evt) {
    evt.target.classList.toggle('place__like-button_active');
  });

  placeDeleteBtn.addEventListener('click', function () {
    placeElement.remove()
  });

  setHandlers(placeImg, placePopupCloseBtn, placePopup);

  return placeElement;
}

const addToContainer = function(container, data) {
  const card = createPlaceCard(data);
  container.prepend(card);
}

const placesGrid = document.querySelector('.places__grid');

// Добавление начальных карточек
initialCards.forEach((card) => {
  addToContainer(placesGrid, card);
});
