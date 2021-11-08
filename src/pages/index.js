import './index.css';

import { Card } from "../components/card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";



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

const initialCardsReversed = initialCards.reverse();

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

const nameInput = document.querySelector(".popup__text_type_name");
const jobInput = document.querySelector(".popup__text_type_profession");

const nameProfile = document.querySelector(".profile__name");
const jobProfile = document.querySelector(".profile__profession");

const cardList = new Section({
  items: initialCardsReversed,
  renderer: (element) => {
    cardList.addItem(createCard(element));

  }
},
containerSelector
);
const popupImage = document.querySelector('.popup_type_place')

const imagePopup = new PopupWithImage(popupImage);


const inputNameProfile = document.querySelector('.profile__name')
const inputProfession = document.querySelector('.profile__profession')
const userInfo = new UserInfo(inputNameProfile, inputProfession);

const profilePopup = document.querySelector('.popup_type_profile')

const userInfoPopup = new PopupWithForm(profilePopup, (data) => {
  userInfo.setUserInfo(data);
});


const popupType = document.querySelector('.popup_type_add');

const newCardPopup = new PopupWithForm(popupType, (formValues) => {
    // при создании экземпляра UserCard передаём
    // ему объект с данными формы
    const card = new Card(formValues,
      {handlers: () => {
        imagePopup.open(formValues.name, formValues.link)
      }

    });

    const cardElement = card.generateCard();

    cardList.addItem(cardElement);
  }
);


function createCard(element) {
  const card = new Card(element, {
    handlers: () => {
      imagePopup.open(element.name, element.link)
    }
  });
  const cardElement = card.generateCard();
  return cardElement;
}

cardList.renderItems();

validatedProfileForm.enableValidation();

validatedAddForm.enableValidation();

imagePopup.setEventListeners();
userInfoPopup.setEventListeners();
newCardPopup.setEventListeners();

newCardPopup.open();
newCardPopup.close();

const openAddPopupButton = document.getElementById("profile__add-button");
const closeAddPopupButton = document.getElementById("popup__type_add-close");

const closeImagePopupButton = document.getElementById("popup_type_place-close");

openAddPopupButton.addEventListener('click', () => {
  newCardPopup.open();
});

closeAddPopupButton.addEventListener('click', () => {
  newCardPopup.close();
})

const openPopupButton = document.querySelector(".profile__open-popup");
const closePopupButton = document.getElementById('popup_profile_close-button');

openPopupButton.addEventListener('click', () => {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  userInfoPopup.open();
})

closePopupButton.addEventListener('click', () => {
  userInfoPopup.close();
})

closeImagePopupButton.addEventListener('click', () => {
  imagePopup.close();
})
