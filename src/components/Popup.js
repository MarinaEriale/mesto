export class Popup {
  constructor(popupSelector) {
    this._popupElement= document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._setEventListeners = this.setEventListeners.bind(this);

    // this._popup = 'popup';
    // this._popupCloseButton = this._popupElement.querySelector('.popup__close-button');
  }

  open() {
    this._popupElement.classList.add("popup_opened");
    document.addEventListener('keyup', this._handleEscClose);
  }


  close() {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener('keyup', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement
        .querySelector('.popup__close-button')
        .addEventListener('click', () => this.close());
    this._popupElement.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) this.close();
    });
  }
}


