import { Popup } from "../components/Popup.js"

export class PopupForDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupFormElement = this._popupElement.querySelector('.popup__edit-form');
    this._yesButton = this._popupFormElement.querySelector('popup__save-button');
  }


  setEventListeners() {
    super.setEventListeners();
    this._popupFormElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }

  setActionSubmit(action) {
    this._handleFormSubmit = action;
  }



}
