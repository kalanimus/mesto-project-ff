export function makeCard(cardData)
{
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElem = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElem.querySelector('.card__image');

  cardElem.querySelector('.card__title').textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardImage.addEventListener('click', () => cardData.imageClickedFunc(cardData.link, cardData.name));
  cardElem.querySelector('.card__delete-button').addEventListener('click', () => cardData.delFunction(cardElem));
  cardElem.querySelector('.card__like-button').addEventListener('click', () => cardData.likeFunction(cardElem));
  return cardElem;
}

export function deleteCard (card)
{
  card.remove();
}


export function likeClicked(card)
{
  const heart = card.querySelector('.card__like-button');
  heart.classList.toggle('card__like-button_is-active');
}