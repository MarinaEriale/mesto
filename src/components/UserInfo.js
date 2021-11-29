export class UserInfo {
  constructor(name, about) {
    this._name = name;
    this._about = about;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent
    }
  }

  setUserInfo(userInfoPopup) {
    this._name.textContent = userInfoPopup.name;
    this._about.textContent = userInfoPopup.about;
  }
}
