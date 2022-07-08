import { closePopup } from './utils.js';
import { modalConfig } from './constants';
export { closePopupByOverlayAndIcon };

function closePopupByOverlayAndIcon (evt) {
  if (evt.target.classList.contains(modalConfig.closeBtnSelector) ||
    evt.target.classList.contains(modalConfig.activeModalClass)) {
      closePopup(evt.target.closest(modalConfig.modalSelector));
  }
}

