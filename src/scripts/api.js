const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-33',
  headers: {
    authorization: '27f1514e-496a-422d-8f30-25a095aec2f3',
    'Content-Type': 'application/json'
  }
}

export const getProfileInfoByAPI = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })

  .then(hadleResponse)

  .catch(handleError)
}

export const getCardsByAPI = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })

  .then(hadleResponse)

  .catch(handleError)
}

export const updateProfileDataAPI = (name, about) => {
  fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(hadleResponse)
  .catch(handleError)
}

export const addNewCardAPI = (name, link) => {
  fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(hadleResponse)
  .catch(handleError)
}

export const deleteCardAPI = (cardId) => {
  fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(hadleResponse)
  .catch(handleError)
}

export const likeCardAPI = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(hadleResponse)
  .catch(handleError)
}

export const unlikeCardAPI = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(hadleResponse)
  .catch(handleError)
}

export const updateAvatarAPI = (avatarUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl
    })
  })
  .then(hadleResponse)
  .catch(handleError)
}

const hadleResponse = (res) => {
  if (res.ok) { 
    return res.json();
  }
  else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
};

const handleError = (err) => {
  console.log(err);
}