class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`${res.status}: ${res.statusText}`);
  }

	_request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }

	getUserInfo() {
    return this._request(`${this._url}/users/me`, {
      headers: this._headers
    })
  }

	getCards() {
    return this._request(`${this._url}/cards`, {
      headers: this._headers
    })
  }

	editUserInfo(newName, newAbout) {
    return this._request(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: newName,
        about: newAbout,
      })
    })
  }

	addCard(data) {
    return this._request(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    })
  }

	removeCard(cardId) {
    return this._request(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
  }

  handleCardLike(cardId, isLiked) {
    return this._request(`${this._url}/cards/${cardId}/likes`, {
      method: `${isLiked ? "DELETE" : "PUT"}`,
      headers: this._headers,
    })
  }

  editUserAvatar(data) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    })
  }
}

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-60",
  headers: {
    authorization: "9c533fd0-d94f-4f7c-9870-53ced17f9818",
    "Content-Type": "application/json",
  },
});

export default api;
