let popup = document.querySelector('.popup');
let profileEditButton = document.querySelector('.profile__edit-button');
console.log(profileEditButton);
let popupCloseButton = document.querySelector('.popup__close-button');

profileEditButton.addEventListener('click', function () {
  popup.classList.add('popup_opened');
});

popupCloseButton.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
})
