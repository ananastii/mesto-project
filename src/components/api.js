export {
  handleError,
  getCards,
  getUserInfo,
  updateUserInfo,
  updateUserAvatar,
  addCard,
  deleteCard,
  editLike
}

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-13/',
  headers: {
    authorization: 'c31c5761-df9a-41b0-b471-54cb40593368',
    'Content-Type': 'application/json; charset=UTF-8'
  }
}

const checkResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

function handleError(err){
  console.log(err)
};

function getCards() {
  return fetch(`${config.baseUrl}/cards`, {headers: config.headers})
  .then(checkResponse)
}

function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {headers: config.headers})
  .then(checkResponse)
}

function updateUserInfo(userName, userDesc) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: userName,
      about: userDesc
    })
  })
  .then(checkResponse)
}

function updateUserAvatar(userPic) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: userPic,
    })
  })
  .then(checkResponse)
}

function addCard(title, url) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: title,
      link: url
    })
  })
  .then(checkResponse)
}

function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
    body: JSON.stringify()
  })
  .then(checkResponse)
}

function editLike(cardId, isLiked) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: isLiked ? 'DELETE' : 'PUT',
    headers: config.headers
  })
  .then(checkResponse)
}
