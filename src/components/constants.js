export {
  validationConfig,
  cardConfig,
  formConfig,
  profileConfig,
  popupEditProfileConfig,
  popupEditAvatarConfig,
  popupAddPlaceConfig,
  modalConfig,
  cardsFeedConfig,
  popupFullImgConfig
}

const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inputErrorMsgSelector: '.form__input-error',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input_invalid',
}

const cardConfig = {
  templateSelector: '#place-template',
  cardElementSelector: '.place',
  cardTitleSelector: '.place__name',
  cardImgSelector: '.place__photo',
  cardLikeSelector: '.place__like-button',
  cardDeleteSelector: '.place__delete-button',
  likeActiveClass: 'place__like-button_active',
  likeCounterSelector: '.place__like-counter',
  deleteButtonHiddenClass: 'place__delete-button_hidden',
}

const formConfig = {
  submitBtnSelector: '.form__button',
}

const profileConfig = {
  elemSelector: '.profile',
  nameSelector: '.profile__name',
  descSelector: '.profile__desc',
  avatarSelector: '.profile__avatar',
  btnEditInfoSelector: '.profile__edit-button',
  btnEditImgSelector: '.profile__avatar-edit-button',
}

const popupEditProfileConfig = {
  popupSelector: '#popup_profile-edit',
  formSelector: '.form[name=profile-edit]',
  inputNameSelector: '#profile-name',
  inputDescSelector: '#profile-desc',
}

const popupEditAvatarConfig = {
  popupSelector: '#popup_avatar-edit',
  formSelector: '.form[name=avatar-edit]',
  inputLinkSelector: '#avatar-link'
}

const popupAddPlaceConfig = {
  popupSelector: '#popup_place-add',
  formSelector: '.form[name=place-add]',
  inputNameSelector: '#place-name',
  inputLinkSelector: '#place-link'
}

const popupFullImgConfig = {
  popupSelector: '#popup_image-open',
  imageSelector: '.popup__image',
  captionSelector: '.popup__caption'
}

const modalConfig = {
  modalSelector: '.popup',
  closeBtnSelector: 'popup__close-button',
  activeModalClass: 'popup_opened',
  activeModalSelector: '.popup_opened'
}

const cardsFeedConfig = {
  containerSelector: '.places__grid',
  btnAddCardSelector: '.profile__add-button'
}
