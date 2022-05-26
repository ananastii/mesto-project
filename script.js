let popup = document.querySelector('.popup');
let profileEditButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__close-button');

profileEditButton.addEventListener('click', function () {
  popup.classList.add('popup_opened');
});

popupCloseButton.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
})

let placeLikeButtons = document.querySelectorAll('.place__like-button');

placeLikeButtons.forEach(button => button.addEventListener('click', function ()
  { console.log(this);
    this.classList.toggle('place__like-button_active');
  })
)
