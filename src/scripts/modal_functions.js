import {makeCard, deleteCard, likeClicked, imageClicked} from './card.js';
import { closePopup } from "./modal.js";

export function getProfileInfo(popup){
  const profile = document.querySelector('.profile');
  const form = popup.querySelector('.popup__form');
  const nameInput = form.querySelector('.popup__input_type_name');
  const jobInput = form.querySelector('.popup__input_type_description');

  nameInput.value = profile.querySelector('.profile__title').textContent;
  jobInput.value = profile.querySelector('.profile__description').textContent;

  function handleFormSubmit(evt) {
    evt.preventDefault();

    profile.querySelector('.profile__title').textContent = nameInput.value;
    profile.querySelector('.profile__description').textContent = jobInput.value;
    form.removeEventListener('submit', handleFormSubmit);

    closePopup(popup);
  }

  form.addEventListener('submit', handleFormSubmit);
  popup.querySelector('.popup__close').addEventListener('click', () => removeLiteners(form, popup, handleFormSubmit));
}

export function addNewPlace(cards){
  const popup = document.querySelector('.popup_type_new-card');
  const form = popup.querySelector('.popup__form');
  const nameInput = form.querySelector('.popup__input_type_card-name');
  const linkInput = form.querySelector('.popup__input_type_url');

  function handleFormSubmit(evt) {
    evt.preventDefault();

    const card = makeCard(nameInput.value, linkInput.value, '', deleteCard, likeClicked, imageClicked);
    cards.prepend(card);
    form.removeEventListener('submit', handleFormSubmit);

    closePopup(popup);
  }

  form.addEventListener('submit', handleFormSubmit);
  popup.querySelector('.popup__close').addEventListener('click', () => removeLiteners(form, popup, handleFormSubmit));
}

export function removeLiteners(form, popup, handleFormSubmit)
  {
    form.addEventListener('submit', handleFormSubmit);  
    popup.querySelector('.popup__close').removeEventListener('click', () => removeLiteners(form, popup, handleFormSubmit));
  }