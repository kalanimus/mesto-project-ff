export function openPopup(popup)
{
  popup.classList.add('popup_is-opened');

  setExitOptions(popup);
}

export function closePopup(popup)
{
  popup.classList.remove('popup_is-opened');
  popup.querySelector('.popup__close').removeEventListener('click', () => closePopup(popup));
  document.removeEventListener('keydown', (evt) => handleKeyDown(evt, popup));
}

function handleKeyDown(evt, popup)
  {
    if(evt.key === 'Escape') 
    {
      closePopup(popup);
    }
  }

function setExitOptions(popup)
{
  popup.querySelector('.popup__close').addEventListener('click', () => closePopup(popup));
  document.addEventListener('keydown', (evt) => handleKeyDown(evt, popup));
}



