export const validationConfig = 
{
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

export const enableValidation = (validationConfig) => 
{
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector)); 
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt)=>{
      evt.preventDefault();
    })
    setEventListeners(formElement, validationConfig)
  })
}

export const clearValidation = (form, validationConfig) =>
{
  const inputList = form.querySelectorAll(validationConfig.inputSelector);
  inputList.forEach((inputElement) => {
    hideInputError(form, inputElement, validationConfig);
    if (form.name != 'new-place' && form.name !== 'update-avatar') {activateButton (form, validationConfig);}
    else {disableButton (form, validationConfig);}
  });
}

const setEventListeners = (formElement, config) =>
{
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, config);
    });
  });
}

const regExp = /^[a-zа-я\s-]+$/i;

const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
    disableButton (formElement, config);
  } else if (!regExp.test(inputElement.value) && inputElement.type !== 'url') {
    showInputError(formElement, inputElement, "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы", config);
    disableButton (formElement, config);
  }else {
    hideInputError(formElement, inputElement, config);
    activateButton (formElement, config);
  }
};

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

const disableButton = (formElement, config) => {
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  buttonElement.disabled = true;
  buttonElement.classList.add(config.inactiveButtonClass);
};

const activateButton = (formElement, config) => {
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  buttonElement.disabled = false;
  buttonElement.classList.remove(config.inactiveButtonClass);
};