export {onError, getCards, getUser, updateUserInfo, addCard}

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-13/',
  headers: {
    authorization: 'c31c5761-df9a-41b0-b471-54cb40593368',
    'Content-Type': 'application/json; charset=UTF-8'
  }
}

const onResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

function onError(err){
  console.log(err)
};

function getCards() {
  return fetch(`${config.baseUrl}/cards`, {headers: config.headers})
  .then(onResponse)
}

function getUser() {
  return fetch(`${config.baseUrl}/users/me`, {headers: config.headers})
  .then(onResponse)
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
  .then(onResponse)
}

function addCard(card) {
//   fetch(`${config.baseUrl}/cards`,
//     {headers: config.headers}, {
//     method: 'POST',
//     body: JSON.stringify({
//       title: card.name,
//       body: card.link
//     }),
//   })
//   .then(onResponse)
}
