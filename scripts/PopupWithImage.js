import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  open({ name, link }) {
    this._popupElement.querySelector('popup__text_type_name').textContent = name;

    const imageElement = this._popupElement.querySelector('popup__text_type_link');
    imageElement.src = link;
    imageElement.alt = name;

    super.open();
  }
}
