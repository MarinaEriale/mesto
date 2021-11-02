import { Card } from "../scripts/Card.js";
import { FormValidator } from "../scripts/FormValidator.js";
import { Section } from "../scripts/Section.js";
import { PopupWithForm } from "../scripts/popupWithForm.js";
import { PopupWithImage } from "../scripts/popupWithImage.js";
import { UserInfo } from "../scripts/userInfo.js";

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const config = {
  formSelector: '.popup__edit-form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__error_visible'
};

const validatedProfileForm = new FormValidator(config, document.querySelector('#personal-info'));

const validatedAddForm = new FormValidator(config, document.querySelector('#place-info'));

const containerSelector = '#elements-container';

const cardList = new Section({
  items: initialCards,
  renderer: (element) => {
    cardList.addItem(createCard(element));

  }
},
containerSelector
);


const imagePopup = new PopupWithImage('.popup_type_place');

const userInfo = new UserInfo();

const userInfoPopup = new PopupWithForm('.popup_type_profile', (data) => {
  userInfo.setUserInfo(data);
});

// const newCardPopup = new PopupWithForm('.popup_type_add', (data) => {
//   cardList.addItem(createCard(data));
// });

const popupType = document.querySelector('.popup_type_add');

const newCardPopup = new PopupWithForm({
  popupSelector: popupType,
  handleFormSubmit: (formValues) => {
    // при создании экземпляра UserCard передаём
    // ему объект с данными формы
    const card = new Card(formValues);

    const cardElement = card.generateCard();

    cardList.addItem(cardElement);
  }
});


function createCard(element) {
  const card = new Card(element);
  const cardElement = card.generateCard();

  return cardElement;
}

cardList.renderItems();

validatedProfileForm.enableValidation();

validatedAddForm.enableValidation();



// const createNewCard = () => {
//   const card = new Card(({ name, link }) => {
//     imagePopup.open({ name, link });
//   });
//   return card;
// }; //функция создания новой карточки из данных



imagePopup.setEventListeners();
userInfoPopup.setEventListeners();
newCardPopup.setEventListeners();

newCardPopup.open();
newCardPopup.close();


const openAddPopupButton = document.getElementById("profile__add-button");
const closeAddPopupButton = document.getElementById("popup__type_add-close");

openAddPopupButton.addEventListener('click', () => {
  newCardPopup.open();
});

closeAddPopupButton.addEventListener('click', () => {
  newCardPopup.close();
})

const openPopupButton = document.querySelector(".profile__open-popup");
const closePopupButton = document.getElementById('popup_profile_close-button');

openPopupButton.addEventListener('click', () => {
  userInfoPopup.open();
})

closePopupButton.addEventListener('click', () => {
  userInfoPopup.close();
})

