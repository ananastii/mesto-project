import {openPopup} from './utils.js';
import {onError, deleteCard} from './api';
export {addToContainer}

const placePopupElement = document.querySelector('#popup_image-open');
const placePopupImg = placePopupElement.querySelector('.popup__image');
const placePopupCaption = placePopupElement.querySelector('.popup__caption');

function createPlaceCard(card, config, myId, cardOwnerId) {
  const placeTemplate = document.querySelector(config.templateSelector).content;
  const placeElement = placeTemplate.querySelector(config.cardElementSelector).cloneNode(true);
  const placeTitleElement = placeElement.querySelector(config.cardTitleSelector);
  const placeImgElement = placeElement.querySelector(config.cardImgSelector);
  const placeLikeBtn = placeElement.querySelector(config.cardLikeSelector);
  const placeDeleteBtn = placeElement.querySelector(config.cardDeleteSelector);

  placeTitleElement.textContent = card.name;
  placeImgElement.setAttribute('src', card.link);
  placeImgElement.setAttribute('alt', card.name);

  if (myId === cardOwnerId) {
    placeDeleteBtn.addEventListener('click', function () {
      deleteCard(card._id)
        .then(placeElement.remove())
        .catch(onError);
    });
  } else {
    placeDeleteBtn.classList.add(config.deleteButtonHiddenClass);
  }

  placeLikeBtn.addEventListener('click', function (evt) {
    evt.target.classList.toggle(config.likeActiveClass);
  });

  placeImgElement.addEventListener('click', function(){
    placePopupImg.setAttribute('src', card.name);
    placePopupImg.setAttribute('alt', card.link);
    placePopupCaption.textContent = placeName;
    openPopup(placePopupElement);
  });

  return placeElement;
}

function addToContainer(container, card, config, myId, cardOwnerId) {
  const cardNew = createPlaceCard(card, config, myId, cardOwnerId);
  container.prepend(cardNew);
}
