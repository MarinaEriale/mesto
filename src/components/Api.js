function onResponce(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res}`);
}

export class Api {
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers;
  }

  getCards() {
    return fetch (`${this._url}/cards`, {
     headers: this._headers,
    })
       .then(onResponce)
  }

  getUserInfo() {
    return fetch (`${this._url}/users/me`, {
      headers: this._headers,
     })
        .then(onResponce)
  }

  setCardLike(cardId) {
    return fetch (`${this._url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers,
     })
        .then(onResponce)
  }

  removeCardLike(cardId) {
    return fetch (`${this._url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
     })
        .then(onResponce)
  }

  editUserInfo(data) {
    return fetch (`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      }),
     })
        .then(onResponce)
  }

  addNewCard(data) {
    return fetch (`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      }),
     })
        .then(onResponce)
  }

  deleteCard(cardId) {
    return fetch (`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
     })
        .then(onResponce)
  }

  editAvatar(link) {
    return fetch (`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      }),
     })
        .then(onResponce)
  }
}
