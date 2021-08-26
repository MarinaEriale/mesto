let openPopupButton = document.querySelector('.profile__open-popup');
let popup = document.querySelector('.popup');
let closePopupButton = document.querySelector('.popup__close-popup');

let formElement = document.querySelector('.popup__container');

let nameInput = formElement.querySelector('.popup__text_type_name');
let jobInput = formElement.querySelector('.popup__text_type_profession');

let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__profession');

function togglePopup() {
  popup.classList.toggle('popup_opened');
}

function formSubmitHandler (event) {
  event.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  togglePopup();
}

function editProfile () {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

openPopupButton.addEventListener('click', togglePopup);
openPopupButton.addEventListener('click', editProfile);
closePopupButton.addEventListener('click', togglePopup);

formElement.addEventListener('submit', formSubmitHandler);
