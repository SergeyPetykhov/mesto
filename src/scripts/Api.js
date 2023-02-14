export class Api {
  constructor(options) {

  }


  getUserData() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-59/users/me', {
      headers: {
        authorization: '26a361d2-5544-4967-a67c-9f781c38c119'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }


  updateUserData(newUserData) {
    fetch('https://mesto.nomoreparties.co/v1/cohort-59/users/me', {
      method: 'PATCH',
      headers: {
        authorization: '26a361d2-5544-4967-a67c-9f781c38c119',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newUserData.newName,
        about: newUserData.newAbout
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }


  updateUserAvatar(newUserAvatar) {
    fetch('https://mesto.nomoreparties.co/v1/cohort-59/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: '26a361d2-5544-4967-a67c-9f781c38c119',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: newUserAvatar.avatarUrl
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }


  getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-59/cards', {
      headers: {
        authorization: '26a361d2-5544-4967-a67c-9f781c38c119'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }


  likeCard(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-59/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: '26a361d2-5544-4967-a67c-9f781c38c119'
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }


  dislikeCard(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-59/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: '26a361d2-5544-4967-a67c-9f781c38c119'
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }


  postNewCard(newImageData) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-59/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: '26a361d2-5544-4967-a67c-9f781c38c119'
      },
      body: JSON.stringify({
        name: newImageData.newImageName,
        link: newImageData.newImageLink
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });

  }


  deleteCard(_id) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-59/cards/' + _id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: '26a361d2-5544-4967-a67c-9f781c38c119'
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

}

