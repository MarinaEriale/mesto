import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._popupFormElement = this._popupElement.querySelector('.popup__edit-form');
    this._handleFormSubmit = handleFormSubmit;

  }

  _getInputValues() {
    // создаём пустой объект
    const formValues = {};

    // достаём все элементы полей
    const inputList = Array.from(this._popupFormElement.querySelectorAll('.form__input'));



    // добавляем в этот объект значения всех полей
    inputList.forEach(inputElement => formValues[inputElement.name] = inputElement.value());

    // возвращаем объект значений
    return formValues;
  }

  setEventListeners() {
    this._popupFormElement.addEventListener('submit', (evt) => {
      evt.preventDefault();

      // добавим вызов функции _handleFormSubmit
      // передадим ей объект — результат работы _getInputValues
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });

    super.setEventListeners();
  }

  close() {
    this._popupFormElement.reset();

    super.close();
  }
}
