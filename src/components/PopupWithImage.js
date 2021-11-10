import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._link = this._popupElement.querySelector('.popup__image');
    this._profession = this._popupElement.querySelector('.popup__image-name');
  }
  open(name, link ) {

    this._link.src = link;
    this._link.alt = name;
    this._profession.textContent = name;

    super.open();
  }
}
