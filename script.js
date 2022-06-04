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

const placeTemplate = document.querySelector('#place-template').content;

const profileElement = document.querySelector('.profile');
const profileNameElement = profileElement.querySelector('.profile__name');
const profileDescElement = profileElement.querySelector('.profile__desc');
const profileEditBtn = profileElement.querySelector('.profile__edit-button');

const profileEditPopup = document.querySelector('#popup_profile-edit');
const profileEditPopupCloseBtn = profileEditPopup.querySelector('.popup__close-button');
const profileEditForm = profileEditPopup.querySelector('.form[name=profile-edit]');
const profileInputName = profileEditForm.querySelector('#profile-name');
const profileInputDesc = profileEditForm.querySelector('#profile-desc');

const placeAddBtn = profileElement.querySelector('.profile__add-button');
const placeAddPopup = document.querySelector('#popup_place-add');
const placeAddPopupCloseBtn = placeAddPopup.querySelector('.popup__close-button');
const placeAddForm = placeAddPopup.querySelector('.form[name=place-add]');
const placeInputName = placeAddForm.querySelector('#place-name');
const placeInputLink = placeAddForm.querySelector('#place-link');

const placePopupElement = document.querySelector('#popup_image-open');
const placePopupCloseBtn = placePopupElement.querySelector('.popup__close-button');
const placePopupImg = placePopupElement.querySelector('.popup__image');
const placePopupCaption = placePopupElement.querySelector('.popup__caption');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

profileEditBtn.addEventListener('click', function() {
  openPopup(profileEditPopup);
});

placeAddBtn.addEventListener('click', function() {
  openPopup(placeAddPopup);
});
const popups = document.querySelectorAll('.popup');

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
     if (evt.target.classList.contains('popup__close-button')) {
        closePopup(popup)
      }
  })
});

// Добавление карточки
const createPlaceCard = function(placeName, placeImgSrc) {
  const placeElement = placeTemplate.querySelector('.place').cloneNode(true);
  const placeTitleElement = placeElement.querySelector('.place__name');
  const placeImgElement = placeElement.querySelector('.place__photo');
  const placeLikeBtn = placeElement.querySelector('.place__like-button');
  const placeDeleteBtn = placeElement.querySelector('.place__delete-button');

  placeTitleElement.textContent = placeName;
  placeImgElement.setAttribute('src', placeImgSrc);
  placeImgElement.setAttribute('alt', placeName);

  placeLikeBtn.addEventListener('click', function (evt) {
    evt.target.classList.toggle('place__like-button_active');
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

const addCardByForm = function(evt) {
  evt.preventDefault();

  const cardPlaceName = placeInputName.value;
  const cardPlaceLink = placeInputLink.value;

  addToContainer(placesGrid, cardPlaceName, cardPlaceLink);

  evt.target.reset();
}

placeAddForm.addEventListener('submit', addCardByForm);

// Изменение профиля

const editProfile = function(evt) {
  evt.preventDefault();

  const inputName = profileInputName.value
  const inputDesc = profileInputDesc.value

  profileInputName.setAttribute('value', inputName);
  profileNameElement.textContent = inputName;
  profileInputDesc.setAttribute('value', inputDesc);
  profileDescElement.textContent = inputDesc;

  evt.target.reset();
}

profileEditForm.addEventListener('submit', editProfile);
