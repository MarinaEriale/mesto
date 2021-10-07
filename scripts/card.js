export class Card {
  constructor(id, options, events) {
    this._rootNode = document.getElementById(id).content.cloneNode(true);
    this._nameNode = this._rootNode.querySelector('.element__text');
    this._imageNode = this._rootNode.querySelector('.element__image');
    this._likeButton = this._rootNode.querySelector('.element__like-button');
    this._deleteButton = this._rootNode.querySelector('.element__delete-button');
    this._elementNode = this._rootNode.querySelector('.element');

    this.setName(options.name);
    this.setLink(options.link);

    this._likeButton.addEventListener('click', () => {
      this.toggleLike();
    });

    this._deleteButton.addEventListener('click', () => {
      this.destroy();
    });

    this._imageNode.addEventListener('click', () => {
       if (events && typeof events.onImageClick === 'function') {
        events.onImageClick();
      }
    })
  }

  setName(name) {
    this._nameNode.textContent = name;
    this._imageNode.setAttribute('alt', name);
  }

  setLink(link) {
    this._imageNode.setAttribute('src', link);
  }

  getTemplate() {
    return this._rootNode;
  }

  toggleLike() {
    this._likeButton.classList.toggle('element__like-button_active');
  }

  destroy() {
    this._elementNode.remove();
  }
}

