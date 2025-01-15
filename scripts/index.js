// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cards = document.querySelector('.places__list');

function makeCard(name, link, alt, delFunciton){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElem = cardTemplate.querySelector('.card').cloneNode(true);

  cardElem.querySelector('.card__title').textContent = name;
  cardElem.querySelector('.card__image').src = link;
  cardElem.querySelector('.card__image').alt = alt;
  cardElem.querySelector('.card__delete-button').addEventListener('click', () => delFunciton(cardElem));

  return cardElem;
}

function deleteCard (card){
  card.remove();
}

initialCards.forEach((card)=>{
  cards.append(makeCard(card.name, card.link, card.alt, deleteCard));
})