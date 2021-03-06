export class UserInfo {
  constructor(name, about, link) {
    this._name = name;
    this._about = about;
    this._link = link;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      // link: this._link.textContent
    }
  }

  setUserInfo(userInfoPopup) {
    this._name.textContent = userInfoPopup.name;
    this._about.textContent = userInfoPopup.about;
  }

  setUserAvatar({avatar}) {
    console.log('Аватар', avatar);
    this._link.src = avatar;
  }


}
