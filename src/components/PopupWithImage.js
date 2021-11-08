import { Popup } from "./Popup.js";
const popupImage = document.querySelector('.popup__image')
const popupProfession = document.querySelector('.popup__image-name')
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._link = popupImage;
    this._profession = popupProfession;
  }
  open(name, link ) {
    // this._popupElement.querySelector('.popup__text_type_name').textContent = name;

    this._link.src = link;
    this._link.alt = name;
    this._profession.textContent = name;

    super.open();
  }

   close() {
     super.close();
   }



  setEventListeners() {
    super.setEventListeners();
  }
}
