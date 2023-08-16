class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._userUrl = `${this._baseUrl}/users/me`;
    this._cardsUrl = `${this._baseUrl}/cards`;
    this._token = headers;
  }

  _getResponseData(res){
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserData() {
    return fetch(this._userUrl, {
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._getResponseData(res));
  }

  saveUserChanges(name, about) {
    return fetch(this._userUrl, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => this._getResponseData(res));
  }

  changedAvatar(src) {
    return fetch(`${this._userUrl}/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: src,
      }),
    }).then((res) => this._getResponseData(res));
  }

  getInitialCards() {
    return fetch(this._cardsUrl, {
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._getResponseData(res));
  }

  postNewCard( name, link ) {
    return fetch(this._cardsUrl, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => this._getResponseData(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._cardsUrl}/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._getResponseData(res));
  }

  likedCard(cardId) {
    return fetch(`${this._cardsUrl}/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._getResponseData(res));
  }

  dislikedCard(cardId) {
    return fetch(`${this._cardsUrl}/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._getResponseData(res));
  }
  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._cardsUrl}/${cardId}/likes`,
      {
        method: isLiked ? "PUT" : "DELETE",
        headers: {
          authorization: this._token,
        },
      }).then((res) => this._getResponseData(res));
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-68",
  headers: "6d6f7c25-ff0c-4cc3-89b7-0784d16e6e95",
  }
);

export default api;