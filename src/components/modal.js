import {closePopup} from './utils.js';
export {closeByOverlay};

function closeByOverlay (evt) {
  if (evt.target.classList.contains('popup__close-button') ||
    evt.target.classList.contains('popup_opened')) {
      closePopup(evt.target.closest('.popup'));
  }
}
