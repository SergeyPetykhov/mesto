export class UserInfo {
  constructor({name, about}) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
  }

  getUserInfo() {
    this._userData = { name: this._name.textContent, about: this._about.textContent };
    return this._userData;
  }

  setUserInfo(userData) {
    if(userData.name && userData.about) {
      this._name.textContent = userData.name;
      this._about.textContent = userData.about;
    }
  }
}
