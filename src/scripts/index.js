// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import '../pages/index.css';
import {initialCards} from './cards.js';
import {makeCard, deleteCard, likeClicked} from './card.js';
import {openModal, closeModal} from './modal.js';
import {enableValidation, clearValidation, validationConfig} from './validation.js';
import {getProfileInfoByAPI, getCardsByAPI, updateProfileDataAPI, addNewCardAPI, deleteCardAPI, likeCardAPI, unlikeCardAPI, updateAvatarAPI} from './api.js';

const cards = document.querySelector('.places__list');
let userId = null;
let cardForDelete = null;

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const profileTypePopup = document.querySelector('.popup_type_edit');
const profileForm = profileTypePopup.querySelector('.popup__form');
const profileNameInput = profileTypePopup.querySelector('.popup__input_type_name');
const profileDescriptionInput = profileTypePopup.querySelector('.popup__input_type_description');
const profileSumbitButton = profileTypePopup.querySelector('.popup__button');

const cardTypePopup = document.querySelector('.popup_type_new-card');
const cardForm = cardTypePopup.querySelector('.popup__form');
const cardNameInput = cardTypePopup.querySelector('.popup__input_type_card-name');
const cardUrlInput = cardTypePopup.querySelector('.popup__input_type_url');
const cardSumbitButton = cardTypePopup.querySelector('.popup__button');

const deleteCardTypePopup = document.querySelector('.popup_type_delete_card');
const confirmDeleteButton = document.querySelector('.popup__confirm-delete-button');

const editAvatarPopup = document.querySelector('.popup_type_avatar_edit');
const editAvatarForm = editAvatarPopup.querySelector('.popup__form');
const avatarUrlInput = editAvatarForm.querySelector('.popup__input_type_url')
const editAvatarButton = document.querySelector('.profile__image_container');
const avatarSumbitButton = editAvatarPopup.querySelector('.popup__button');

const imageTypePopup = document.querySelector('.popup_type_image');
const popupImage = imageTypePopup.querySelector('.popup__image');
const popupCaption = imageTypePopup.querySelector('.popup__caption');

const popupCloseButtons = document.querySelectorAll('.popup__close');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

enableValidation(validationConfig);

Promise.all([getProfileInfoByAPI(), getCardsByAPI()]).then(([profileData, cardsData]) => {
  userId = profileData._id;

  profileName.textContent = profileData.name;
  profileDescription.textContent = profileData.about;
  profileImage.src = profileData.avatar;

  cardsData.forEach(cardData => {cards.append(makeCard(cardData, cardFunctions, userId))});
})

const handleDeleteCard = (cardId, cardElement) => {
  cardForDelete = {
    cardId: cardId,
    cardElement: cardElement
  }
  openModal(deleteCardTypePopup);
}

confirmDeleteButton.addEventListener('click', () => {
  if (!cardForDelete) return;

  deleteCardAPI(cardForDelete.cardId);
  deleteCard(cardForDelete.cardElement);

  cardForDelete = null;

  closeModal(deleteCardTypePopup);
})

const handleLikeCard = (cardId, cardElement) => {
  if (cardElement.querySelector('.card__like-button').classList.contains('card__like-button_is-active')){
    unlikeCardAPI(cardId).then(res => cardElement.querySelector('.card__like-amount').textContent = res.likes.length);
  } else {
    likeCardAPI(cardId).then(res => cardElement.querySelector('.card__like-amount').textContent = res.likes.length);
  }
  likeClicked(cardElement);
}

const cardFunctions =
{
  delFunction: handleDeleteCard,
  likeFunction: handleLikeCard,
  imageClickedFunc: imageClicked
};

editAvatarButton.addEventListener('click', (evt) => {
  resetButtonText(avatarSumbitButton);
  openModal(editAvatarPopup);
  clearValidation(editAvatarForm, validationConfig);
})

profileEditButton.addEventListener('click', function(evt){
  resetButtonText(profileSumbitButton);
  openModal(profileTypePopup);
  getDataFromProfile();
  clearValidation(profileForm, validationConfig);
});

profileAddButton.addEventListener('click', function(evt){
  resetButtonText(cardSumbitButton);
  openModal(cardTypePopup);
  clearValidation(cardForm, validationConfig);
});

popupCloseButtons.forEach(closeButton => {
  closeButton.addEventListener('click', function(evt){
    closeModal(evt.target.parentNode.parentNode);
  });
});

profileForm.addEventListener('submit', setDataFromProfile);

cardForm.addEventListener('submit', addNewPlace);

editAvatarForm.addEventListener('submit', updateAvatar);

function imageClicked(link, name)
{
  openModal(imageTypePopup);
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
}

function getDataFromProfile()
{
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function setDataFromProfile(evt)
{
  evt.preventDefault();
  toggleLoading(profileSumbitButton);
  const newName = profileNameInput.value;
  const newAbout = profileDescriptionInput.value;
  profileName.textContent = newName;
  profileDescription.textContent = newAbout;
  updateProfileDataAPI(newName, newAbout);
  closeModal(profileTypePopup);
}

function addNewPlace(evt)
{
  evt.preventDefault();
  toggleLoading(cardSumbitButton);
  const cardData = {
    name: cardNameInput.value,
    link: cardUrlInput.value,
    likes: 0,
  }

  cards.prepend(makeCard(cardData, cardFunctions));
  addNewCardAPI(cardData.name, cardData.link);

  closeModal(cardTypePopup);

  cardForm.reset();
}

function updateAvatar () {
  toggleLoading(avatarSumbitButton);
  const avatarUrl = avatarUrlInput.value;
  profileImage.src = avatarUrl;
  updateAvatarAPI(avatarUrl);
  closeModal(editAvatarPopup);
  editAvatarForm.reset();
}

function toggleLoading (button) {
  console.log(button.textContent);
  button.textContent = 'Сохранение...';
  console.log(button.textContent);
}

function resetButtonText (button){
  button.textContent = 'Сохранить';
}