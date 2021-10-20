import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const openPopupButton = document.querySelector(".profile__open-popup");
const profilePopup = document.querySelector(".popup_type_profile");
const closePopupButton = document.querySelector(".popup__close-popup");

const profileForm = document.querySelector(".popup__edit-form");

const nameInput = profileForm.querySelector(".popup__text_type_name");
const jobInput = profileForm.querySelector(".popup__text_type_profession");

const nameProfile = document.querySelector(".profile__name");
const jobProfile = document.querySelector(".profile__profession");

const placePopup = document.querySelector(".popup_type_place");

const ESC_CODE = "Escape";

const templateContainer = document.getElementById("elements-container");

const placeImage = placePopup.querySelector(".popup__image");
const placeName1 = placePopup.querySelector(".popup__image-name");

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

function createCard (element) {
  const card = new Card("elements-template", element, {
    onImageClick: () => {
      placeImage.src = element.link;
      placeName1.textContent = element.name;
      placeImage.setAttribute("alt", element.name);
      openPopup(placePopup);
    },
  }).generateCard();

   return card;
}

initialCards.forEach(function (card) {
  templateContainer.append(createCard(card));
});

function openPopup(popup) {
  popup.classList.add("popup_opened");
  popup.addEventListener("click", closeByClick);
  document.addEventListener("keydown", closeByEsc);
}

function submitProfileForm(event) {
  event.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(profilePopup);
}

function editProfile() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

function openProfilePopup() {
  openPopup(profilePopup);
  editProfile();
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEsc);
  popup.removeEventListener("click", closeByClick);
}

openPopupButton.addEventListener("click", openProfilePopup);
closePopupButton.addEventListener("click", function () {
  closePopup(profilePopup);
});

profileForm.addEventListener("submit", submitProfileForm);

const openAddPopupButton = document.getElementById("profile__add-button");
const popupCard = document.getElementById("popup_type_add");
const closeAddPopupButton = popupCard.querySelector(".popup__close-popup");
const saveButton = popupCard.querySelector(".popup__save-button");

const cardForm = popupCard.querySelector(".popup__edit-form");
const placeName = popupCard.querySelector(".popup__text_type_name");
const placeLink = popupCard.querySelector(".popup__text_type_link");

openAddPopupButton.addEventListener("click", function () {
  openPopup(popupCard);
});
closeAddPopupButton.addEventListener("click", function () {
  closePopup(popupCard);
});

function submitCardForm(event) {
  event.preventDefault();
  const element = { name: placeName.value, link: placeLink.value };
  templateContainer.prepend(createCard(element));

  closePopup(popupCard);
  saveButton.setAttribute("disabled", true);
  saveButton.classList.add("popup__save-button_disabled");
  placeName.value = "";
  placeLink.value = "";
}

cardForm.addEventListener("submit", submitCardForm);

const placeCloseButton = placePopup.querySelector(".popup__close-popup");

placeCloseButton.addEventListener("click", function () {
  closePopup(placePopup);
});

function closeByEsc(evt) {
  if (evt.key === ESC_CODE) {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

function closeByClick(evt) {
  closePopup(evt.target);
}

const formElement = document.querySelector('.popup__edit-form');

const validatedProfileForm = new FormValidator(config, document.querySelector('#personal-info'));
validatedProfileForm.enableValidation();

const validatedAddForm = new FormValidator(config, document.querySelector('#place-info'));
validatedAddForm.enableValidation();
