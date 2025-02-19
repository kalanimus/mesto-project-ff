import { openPopup } from "./modal.js";

export function makeCard(name, link, alt, delFunciton, likeCliked, imageClicked){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElem = cardTemplate.querySelector('.card').cloneNode(true);

  cardElem.querySelector('.card__title').textContent = name;
  cardElem.querySelector('.card__image').src = link;
  cardElem.querySelector('.card__image').alt = alt;
  cardElem.querySelector('.card__delete-button').addEventListener('click', () => delFunciton(cardElem));
  cardElem.querySelector('.card__like-button').addEventListener('click', () => likeCliked(cardElem));
  cardElem.querySelector('.card__image').addEventListener('click', () => imageClicked(link, name));

  return cardElem;
}

export function deleteCard (card){
  card.remove();
}


export function likeClicked(card) {
  const heart = card.querySelector('.card__like-button');
  if (heart.classList.contains('card__like-button_is-active'))
  {
    heart.classList.remove('card__like-button_is-active');
  } else {
    heart.classList.add('card__like-button_is-active');
  }
}

export function imageClicked(link, name){
  openPopup(document.querySelector('.popup_type_image'));
  const popup = document.querySelector('.popup_is-opened');
  const image = popup.querySelector('.popup__image');
  const caption = popup.querySelector('.popup__caption');

  image.src = link;
  caption.textContent = name;
}