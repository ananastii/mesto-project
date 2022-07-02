export {openPopup, closePopup, hideFormErrors};

// закрытие popup по esc
const keyHandler = (evt) => {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    if (activePopup) {
      closePopup(activePopup);
    }
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keyHandler);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyHandler);
}

const hideFormErrors = (formElement, config) => {
  const formErrors = formElement.querySelectorAll(config.inputErrorMsgSelector);
  const formInputs = formElement.querySelectorAll(config.inputSelector);
  formErrors.forEach(error => error.textContent = '');
  formInputs.forEach(input => input.classList.remove(config.inputErrorClass));
}
