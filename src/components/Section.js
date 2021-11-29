export class Section {
  constructor({renderer}, containerSelector) {
    // this._initialCards = items;
    this._renderer = renderer; //функция
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    items.forEach(item => this._renderer(item));
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
