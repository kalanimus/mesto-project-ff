// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import '../pages/index.css';
import {initialCards} from './cards.js';
import {makeCard, deleteCard, likeClicked, imageClicked} from './card.js';
import {openPopup, closePopup} from './modal.js';
import {getProfileInfo, addNewPlace} from './modal_functions.js';

const cards = document.querySelector('.places__list');
const profile = document.querySelector('.profile');

initialCards.forEach((card)=> {
  cards.append(makeCard(card.name, card.link, card.alt, deleteCard, likeClicked, imageClicked));
})

profile.addEventListener('click', function(evt){
  const clickedElem = evt.target.classList.value;
  if (clickedElem.includes('button')){
    if (clickedElem.includes('add'))
    {
      openPopup(document.querySelector('.popup_type_new-card'));
      addNewPlace(cards);
    } 
    else if (clickedElem.includes('edit')) 
    {
      const popup = document.querySelector('.popup_type_edit');
      openPopup(popup);
      getProfileInfo(popup);
    }
  }
} );