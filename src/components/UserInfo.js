export class UserInfo {
  constructor(name, profession) {
    this._name = name;
    this._profession = profession;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      profession: this._profession.textContent
    }
  }

  setUserInfo(userInfoPopup) {
    this._name.textContent = userInfoPopup.name;
    this._profession.textContent = userInfoPopup.profession

  }

}
