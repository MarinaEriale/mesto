export class Card {
  constructor(id, {data, handleCardClick, handleLikeClick}) {
    console.log(data);
    this._rootNode = document.getElementById(id).content.cloneNode(true);
    this._nameNode = this._rootNode.querySelector('.element__text');
    this._imageNode = this._rootNode.querySelector('.element__image');
    this._likeButton = this._rootNode.querySelector('.element__like-button');
    this._deleteButton = this._rootNode.querySelector('.element__delete-button');
    this._elementNode = this._rootNode.querySelector('.element');

    this.id = data._id;
    this._likes = data.likes;
    this._currentUserId = data.currentUserId;


    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;

    this._setName(data.name);
    this._setLink(data.link);

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

  // _toggleLike() {
  //   this._likeButton.classList.toggle('element__like-button_active');
  // }

  _destroy() {
    this._elementNode.remove();
  }

  isLiked() {
    return this._likes.some(user => user._id === this._currentUserId)
  }

  setLikes(dataLikes) {
    this._likes = dataLikes;
    this._updateLike();
    console.log(this);
    console.log(dataLikes);
  }

  _updateLike() {
    if (this.isLiked()) {
      this._likeButton.classList.add('element__like-button_active')
    } else {
      this._likeButton.classList.remove('element__like-button_active');
    }
  }


  _setEventListeners() {
    this._imageNode.addEventListener('click', this._handleCardClick)
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this);
    });

    this._deleteButton.addEventListener('click', () => {
      this._destroy();
    });

  }

}

