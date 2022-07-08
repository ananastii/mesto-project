import {
  modalConfig
} from './constants';
export {
  openPopup,
  closePopup,
  hideFormErrors
};

const closePopupByEsc = (evt) => {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector(modalConfig.activeModalSelector);
    if (activePopup) {
      closePopup(activePopup);
    }
  }
}

function openPopup(popup) {
  popup.classList.add(modalConfig.activeModalClass);
  document.addEventListener('keydown', closePopupByEsc);
}

function closePopup(popup) {
  popup.classList.remove(modalConfig.activeModalClass);
  document.removeEventListener('keydown', closePopupByEsc);
}

const hideFormErrors = (formElement, config) => {
  const formErrors = formElement.querySelectorAll(config.inputErrorMsgSelector);
  const formInputs = formElement.querySelectorAll(config.inputSelector);
  formErrors.forEach(error => error.textContent = '');
  formInputs.forEach(input => input.classList.remove(config.inputErrorClass));
}
