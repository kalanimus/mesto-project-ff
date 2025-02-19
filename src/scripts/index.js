// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import '../pages/index.css';
import {initialCards} from './cards.js';
import {makeCard, deleteCard, likeClicked} from './card.js';
import {openModal, closeModal} from './modal.js';

const cards = document.querySelector('.places__list');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileTypePopup = document.querySelector('.popup_type_edit');
const profileForm = profileTypePopup.querySelector('.popup__form');
const profileNameInput = profileTypePopup.querySelector('.popup__input_type_name');
const profileDescriptionInput = profileTypePopup.querySelector('.popup__input_type_description');

const cardTypePopup = document.querySelector('.popup_type_new-card');
const cardForm = cardTypePopup.querySelector('.popup__form');
const cardNameInput = cardTypePopup.querySelector('.popup__input_type_card-name');
const cardUrlInput = cardTypePopup.querySelector('.popup__input_type_url');

const imageTypePopup = document.querySelector('.popup_type_image');
const popupImage = imageTypePopup.querySelector('.popup__image');
const popupCaption = imageTypePopup.querySelector('.popup__caption');

const popupCloseButtons = document.querySelectorAll('.popup__close');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

initialCards.forEach((card)=> {
  const cardData = 
  {
    name: card.name,
    link: card.link,
    alt: card.name,
    delFunction: deleteCard,
    likeFunction: likeClicked,
    imageClickedFunc: imageClicked
  }
  cards.append(makeCard(cardData));
})

profileEditButton.addEventListener('click', function(evt){
  openModal(profileTypePopup);
  getDataFromProfile();
});

profileAddButton.addEventListener('click', function(evt){
  openModal(cardTypePopup);
});

popupCloseButtons.forEach(closeButton => {
  closeButton.addEventListener('click', function(evt){
    closeModal(evt.target.parentNode.parentNode);
  });
});

profileForm.addEventListener('submit', setDataFromProfile);

cardForm.addEventListener('submit', addNewPlace);

function imageClicked(link, name)
{
  openModal(imageTypePopup);
  popupImage.src = link;
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
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileTypePopup);
}

function addNewPlace(evt)
{
  evt.preventDefault();

  const cardData = {
    name: cardNameInput.value,
    link: cardUrlInput.value,
    alt: cardNameInput.value,
    delFunction: deleteCard,
    likeFunction: likeClicked,
    imageClickedFunc: imageClicked
  }

  cards.prepend(makeCard(cardData));

  closeModal(cardTypePopup);

  cardForm.reset();
}