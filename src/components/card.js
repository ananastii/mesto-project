import { openPopup } from './modal';
import { popupFullImgConfig } from './constants';
import {
  handleError,
  deleteCard,
  editLike} from './api';
export { addToContainer }

const placePopupElement = document.querySelector(popupFullImgConfig.popupSelector);
const placePopupImg = placePopupElement.querySelector(popupFullImgConfig.imageSelector);
const placePopupCaption = placePopupElement.querySelector(popupFullImgConfig.captionSelector);

function checkLike(likesList, userId) {
  return likesList.some(like => {
    return like._id === userId;
  });
}

function renderLikeView(checkLikeFunc, likesList, userId, likeBtnElement, likeActiveClass, likeCountElement) {
  checkLikeFunc(likesList, userId) ?
    likeBtnElement.classList.add(likeActiveClass) :
    likeBtnElement.classList.remove(likeActiveClass);
  likeCountElement.textContent = likesList.length;
}

function createPlaceCard(card, config, myId, cardOwnerId) {
  const placeTemplate = document.querySelector(config.templateSelector).content;
  const placeElement = placeTemplate.querySelector(config.cardElementSelector).cloneNode(true);
  const placeTitleElement = placeElement.querySelector(config.cardTitleSelector);
  const placeImgElement = placeElement.querySelector(config.cardImgSelector);
  const placeLikeBtn = placeElement.querySelector(config.cardLikeSelector);

  const placeLikeCounter = placeElement.querySelector(config.likeCounterSelector);
  const placeDeleteBtn = placeElement.querySelector(config.cardDeleteSelector);

  placeTitleElement.textContent = card.name;
  placeImgElement.setAttribute('src', card.link);
  placeImgElement.setAttribute('alt', card.name);

  renderLikeView(checkLike, card.likes, myId, placeLikeBtn, config.likeActiveClass, placeLikeCounter);

  if (myId === cardOwnerId) {
    placeDeleteBtn.addEventListener('click', function () {
      deleteCard(card._id)
        .then(() => placeElement.remove())
        .catch(handleError);
    });
  } else {
    placeDeleteBtn.classList.add(config.deleteButtonHiddenClass);
  }

  placeLikeBtn.addEventListener('click', function () {
    const isLiked = placeLikeBtn.classList.contains(config.likeActiveClass);

    editLike(card._id, isLiked)
      .then(res => {
        renderLikeView(checkLike, res.likes, myId, placeLikeBtn, config.likeActiveClass, placeLikeCounter)
      })
      .catch(handleError);
  });

  placeImgElement.addEventListener('click', function(){
    placePopupImg.setAttribute('src', card.link);
    placePopupImg.setAttribute('alt', card.name);
    placePopupCaption.textContent = card.name;
    openPopup(placePopupElement);
  });

  return placeElement;
}

function addToContainer(container, card, config, myId, cardOwnerId) {
  const cardNew = createPlaceCard(card, config, myId, cardOwnerId);
  container.prepend(cardNew);
}

