export class Card {
  constructor(options, {handlers}) {
    this._rootNode = document.getElementById("elements-template").content.cloneNode(true);
    this._nameNode = this._rootNode.querySelector('.element__text');
    this._imageNode = this._rootNode.querySelector('.element__image');
    this._likeButton = this._rootNode.querySelector('.element__like-button');
    this._deleteButton = this._rootNode.querySelector('.element__delete-button');
    this._elementNode = this._rootNode.querySelector('.element');
    this._handlers = handlers

    this._setName(options.name);
    this._setLink(options.link);

    this._setEventListeners();
  }

  _setName(name) {
    this._nameNode.textContent = name;
    this._imageNode.setAttribute('alt', name);
  }

  _setLink(link) {
    this._imageNode.setAttribute('src', link);
  }

  generateCard() {
    return this._rootNode;
  }

  _toggleLike() {
    this._likeButton.classList.toggle('element__like-button_active');
  }

  _destroy() {
    this._elementNode.remove();
  }

  _setEventListeners() {
    this._imageNode.addEventListener('click', this._handlers)
    this._likeButton.addEventListener('click', () => {
      this._toggleLike();
    });

    this._deleteButton.addEventListener('click', () => {
      this._destroy();
    });

  }

}

