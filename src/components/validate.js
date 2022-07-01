const toggleButtonState = (buttonElement, inactiveButtonClass, formElement) => {
  const isFormValid = formElement.checkValidity();
  if (isFormValid) {
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.disabled = false;
  } else {
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.disabled = 'disabled';
  }
}

const showInputError = (inputElement, errorMsgElement, inputErrorClass) => {
  errorMsgElement.textContent = inputElement.validationMessage;
  inputElement.classList.add(inputErrorClass);
}

const hideInputError = (inputElement, errorMsgElement, inputErrorClass) => {
  errorMsgElement.textContent = inputElement.validationMessage;
  inputElement.classList.remove(inputErrorClass);
}

const checkInputValidity = (formElement, inputElement, inputErrorClass) => {
  const isInputValid = inputElement.validity.valid;
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  if (!isInputValid) {
    showInputError(inputElement, errorElement, inputErrorClass);
  } else {
    hideInputError(inputElement, errorElement, inputErrorClass);
  }
}

const setEventListeners = (formElement, config) => {
  const inputsList = formElement.querySelectorAll(config.inputSelector);
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

  inputsList.forEach(input => {
    toggleButtonState(buttonElement, config.inactiveButtonClass, formElement);
    input.addEventListener('input', (evt) => {
      checkInputValidity(formElement, input, config.inputErrorClass);
      toggleButtonState(buttonElement, config.inactiveButtonClass, formElement);
    })
  })
}

export default function enableValidation(config){
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach(form => {
    setEventListeners(form, config);
  })
}
