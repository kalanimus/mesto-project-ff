export function makeCard(cardData, cardFunctions, profileId)
{
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElem = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElem.querySelector('.card__image');

  cardElem.querySelector('.card__title').textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElem.querySelector('.card__like-amount').textContent = Array.from(cardData.likes).length;
  updateLike(cardData.likes, profileId, cardElem);
  cardImage.addEventListener('click', () => cardFunctions.imageClickedFunc(cardData.link, cardData.name));
  cardElem.querySelector('.card__like-button').addEventListener('click', () => cardFunctions.likeFunction(cardData._id, cardElem));
  if (cardData.owner === undefined || cardData.owner._id === profileId) {
    cardElem.querySelector('.card__delete-button').addEventListener('click', () => cardFunctions.delFunction(cardData._id, cardElem));
  } else {
    cardElem.querySelector('.card__delete-button').remove();
  }
  
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

function updateLike(likes, profileId, card){
  if (likes !== 0 && likes.some(user => user._id === profileId)){
    likeClicked(card);
  }
}