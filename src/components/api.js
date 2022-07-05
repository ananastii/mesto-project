export {getCards}

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-13/',
  headers: {
    authorization: 'c31c5761-df9a-41b0-b471-54cb40593368',
    'Content-Type': 'application/json'
  }
}

const onResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);


function getCards() {
  return fetch(`${config.baseUrl}/cards`, {headers: config.headers})
  .then(onResponse)
  .catch(err => console.log(err));
}
