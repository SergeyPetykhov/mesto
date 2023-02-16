export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._authorization = options.headers.authorization;

  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._authorization
      }
    })
      .then(res => {
        return this._checkResponse(res);
      });
  }

  updateUserData(newUserData) {
    fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newUserData.name,
        about: newUserData.about
      })
    })
      .then(res => {
        return this._checkResponse(res);
      });
  }

  updateUserAvatar(newUserAvatar) {
    fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: newUserAvatar.avatarUrl
      })
    })
      .then(res => {
        return this._checkResponse(res);
      });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._authorization
      }
    })
      .then(res => {
        return this._checkResponse(res);
      });
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization
      },
    })
      .then(res => {
        return this._checkResponse(res);
      });
  }

  dislikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      },
    })
      .then(res => {
        return this._checkResponse(res);
      });
  }

  postNewCard(newImageData) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: this._authorization
      },
      body: JSON.stringify({
        name: newImageData.newImageName,
        link: newImageData.newImageLink
      })
    })
      .then(res => {
        return this._checkResponse(res);
      });
  }

  deleteCard(_id) {
    return fetch(`${this._baseUrl}/cards/` + _id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: this._authorization
      },
    })
      .then(res => {
        return this._checkResponse(res);
      });
  }

}

