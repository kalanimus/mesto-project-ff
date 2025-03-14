export function openModal(popup)
{
  document.addEventListener('keydown', handleEscDown);
  popup.addEventListener('mousedown', handleOverlayClicked);
  popup.classList.add('popup_is-opened');
}

export function closeModal(popup)
{
  popup.classList.remove('popup_is-opened');
  popup.removeEventListener('mousedown', handleOverlayClicked);
  document.removeEventListener('keydown', handleEscDown);
}

function handleEscDown(evt)
{
  if(evt.key === 'Escape') 
  {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  }
}

function handleOverlayClicked(evt)
{
  const popupContent = evt.currentTarget.querySelector('.popup__content');
    if (!popupContent.contains(evt.target)) {
        closeModal(evt.currentTarget);
    }
}


