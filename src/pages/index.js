import './index.css';

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";

import {
  initialCardsReversed,
  config,
  containerSelector,
  nameInput,
  jobInput,
  inputNameProfile,
  inputProfession,
  openAddPopupButton,
  openPopupButton
}  from "../utils/components.js"


const validatedProfileForm = new FormValidator(config, document.querySelector('#personal-info'));

const validatedAddForm = new FormValidator(config, document.querySelector('#place-info'));

const cardList = new Section({
  items: initialCardsReversed,
  renderer: (element) => {
    cardList.addItem(createCard(element));
  }
},
containerSelector
);

const userInfo = new UserInfo(inputNameProfile, inputProfession);

const userInfoPopup = new PopupWithForm('.popup_type_profile', (data) => {
  userInfo.setUserInfo(data);
});

const newCardPopup = new PopupWithForm('.popup_type_add', (formValues) => {
    cardList.addItem(createCard(formValues));
  }
);


const imagePopup = new PopupWithImage('.popup_type_place');

function createCard(element) {
  const card = new Card("elements-template",
    element, {
      handleCardClick: () => {
      imagePopup.open(element.name, element.link)
    }
  });
  const cardElement = card.generateCard();
  return cardElement;
};

cardList.renderItems();

validatedProfileForm.enableValidation();

validatedAddForm.enableValidation();

imagePopup.setEventListeners();
userInfoPopup.setEventListeners();
newCardPopup.setEventListeners();

openAddPopupButton.addEventListener('click', () => {
  validatedAddForm.resetValidation();
  newCardPopup.open();
});

openPopupButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.profession;
  userInfoPopup.open();
});
