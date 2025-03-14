const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-33',
  headers: {
    authorization: '27f1514e-496a-422d-8f30-25a095aec2f3',
    'Content-Type': 'application/json'
  }
}

export const getProfileInfoByAPI = () => {
  return request(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
}

export const getCardsByAPI = () => {
  return request(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
}

export const updateProfileDataAPI = (name, about) => {
  return request(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })

}

export const addNewCardAPI = (name, link) => {
  return request(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
}

export const deleteCardAPI = (cardId) => {
  return request(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
}

export const likeCardAPI = (cardId) => {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: config.headers
    })
}

export const unlikeCardAPI = (cardId) => {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
}

export const updateAvatarAPI = (avatarUrl) => {
  return request(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl
    })
  })
}

const hadleResponse = (res) => {
  if (res.ok) { 
    return res.json();
  }
  else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
};

const request = (url, options) => {
  return fetch(url, options).then(hadleResponse)
}
