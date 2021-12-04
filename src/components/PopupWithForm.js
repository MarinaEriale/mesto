import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._popupFormElement = this._popupElement.querySelector('.popup__edit-form');
    this._handleFormSubmit = handleFormSubmit;

    this._submitButton = this._popupElement.querySelector('.popup__save-button');

  }

  _getInputValues() {
    // создаём пустой объект
    this._formValues = {};

    // достаём все элементы полей
    this._inputList = Array.from(this._popupFormElement.querySelectorAll('.popup__text'));



    // добавляем в этот объект значения всех полей
    this._inputList.forEach(inputElement => this._formValues[inputElement.name] = inputElement.value);

    // возвращаем объект значений
    return this._formValues;
  }

  setEventListeners() {
    this._popupFormElement.addEventListener('submit', (evt) => {
      evt.preventDefault();

      // добавим вызов функции _handleFormSubmit
      // передадим ей объект — результат работы _getInputValues

      this._handleFormSubmit(this._getInputValues());
      // this.close();
    });

    super.setEventListeners();
  }

  close() {
    this._popupFormElement.reset();

    super.close();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Сохранение...";
    } else {
      this._submitButton.textContent = "Сохранить";
    }
  }

}
