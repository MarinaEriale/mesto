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




}
