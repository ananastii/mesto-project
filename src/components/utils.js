import { closePopup } from './modal';
import { toggleButtonState } from './validate';
export {
  hideFormErrors,
  renderLoading,
  handlePopupOnResponce
};

const hideFormErrors = (formElement, config) => {
  const formErrors = formElement.querySelectorAll(config.inputErrorMsgSelector);
  const formInputs = formElement.querySelectorAll(config.inputSelector);
  formErrors.forEach(error => error.textContent = '');
  formInputs.forEach(input => input.classList.remove(config.inputErrorClass));
}

function renderLoading(isLoading, submitButton, defaultBtnText = 'Сохранить'){
  submitButton.textContent = isLoading ? 'Сохранение...' : defaultBtnText;
}

function handlePopupOnResponce(popup, popupForm, formSubmitBtn, inactiveBtnClass) {
  closePopup(popup);
  popupForm.reset();
  toggleButtonState(formSubmitBtn, inactiveBtnClass, popupForm);
}
