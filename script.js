let openPopupButton = document.querySelector('.profile__open-popup');
let popup = document.querySelector('.popup');
let closePopupButton = document.querySelector('.popup__close-popup');

function togglePopup() {
  popup.classList.toggle('popup_opened');
}

openPopupButton.addEventListener('click', togglePopup);

closePopupButton.addEventListener('click', togglePopup);

let formElement = document.querySelector('.popup__container');

let nameInput = formElement.querySelector('.popup__text_type_name');
let jobInput = formElement.querySelector('.popup__text_type_profession');

let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__profession');

nameInput.value = nameProfile.textContent;
jobInput.value = jobProfile.textContent;

function formSubmitHandler (event) {
    event.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    togglePopup();
}

formElement.addEventListener('submit', formSubmitHandler);
