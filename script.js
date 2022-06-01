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

// Активные лайка
const likeButtons = document.querySelectorAll('.place__like-button');

likeButtons.forEach((button)=> {
  button.addEventListener('click', function (evt) {
    evt.target.classList.toggle('place__like-button_active')
  })
});


