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


function toggleStatePopup(popup) {
  popup.classList.toggle('popup_opened');
}

// Открытие и закрытие popup для редактирования профиля
const profileEditPopup = document.querySelector('#popup_profile-edit');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopupCloseButton = profileEditPopup.querySelector('.popup__close-button');

profileEditButton.addEventListener('click', () => {
  toggleStatePopup(profileEditPopup);
});

profileEditPopupCloseButton.addEventListener('click', () => {
  toggleStatePopup(profileEditPopup);
});

// Открытие и закрытие popup для добавления места профиля
const placeAddPopup = document.querySelector('#popup_place-add');
const placeAddButton = document.querySelector('.profile__add-button');
const placeAddPopupCloseButton = placeAddPopup.querySelector('.popup__close-button');

placeAddButton.addEventListener('click', () => {
  toggleStatePopup(placeAddPopup);
});

placeAddPopupCloseButton.addEventListener('click', () => {
  toggleStatePopup(placeAddPopup);
});

// Добавление карточки

const placesGrid = document.querySelector('.places__grid');

function addplaceElement(placeName, placeImgSrc) {
  const placeTemplate = document.querySelector('#place-template').content;
  const placeElement = placeTemplate.querySelector('.place').cloneNode(true);
  const placeTitle = placeElement.querySelector('.place__name');
  const placeImg = placeElement.querySelector('.place__photo');
  const placeLikeButton = placeElement.querySelector('.place__like-button');
  const placeDeleteButton = placeElement.querySelector('.place__delete-button');
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

  placeLikeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('place__like-button_active');
  });

  placeDeleteButton.addEventListener('click', function () {
    placeElement.remove()
  });

  [placeImg, placePopupCloseBtn].forEach(function(handler) {
    handler.addEventListener('click', function() {
      toggleStatePopup(placePopup);
    });
  });

placesGrid.prepend(placeElement);
}

// Добавление начальных карточек
initialCards.forEach(card => addplaceElement(card.name, card.link));
