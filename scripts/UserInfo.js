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

  setUserInfo() {
    this._name.textContent = userInfoPopup.profile_name;
    this._profession.textContent = userInfoPopup.profile_profession

  }

}
