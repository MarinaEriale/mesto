import './index.css';

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";

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

const api = new Api({
  url:'https://nomoreparties.co/v1/cohort-30',
  headers:{
    authorization: '6cb839ab-b14f-43d1-9065-67e2d1df3e24'
  }
});

const validatedProfileForm = new FormValidator(config, document.querySelector('#personal-info'));

const validatedAddForm = new FormValidator(config, document.querySelector('#place-info'));

let userId = null;

Promise.all([api.getCards(), api.getUserInfo()])
   .then(([cardData, userData]) => {
     userId = userData._id;
     cardList.renderItems(cardData);
     userInfo.setUserInfo(userData);

     console.log('Данные карточек', cardData);
     console.log('Данные пользователя', userData)
   })

const cardList = new Section({
  // items: initialCardsReversed,
  renderer: (element) => {
    cardList.addItem(createCard(element));
  }
},
containerSelector
);

function createCard(element) {
  const card = new Card("elements-template",
    {
      data: {...element, currentUserId: userId},
      handleCardClick: () => {
        imagePopup.open(element.name, element.link)
      },
      handleLikeClick: (card) => {
        if (card.isLiked()) {
          api.removeCardLike(card.id)
          .then(cardData => card.setLikes(cardData.likes))
        } else {
          api.setCardLike(card.id)
          .then(cardData => card.setLikes(cardData.likes))
        }


      }
  });
  const cardElement = card.generateCard();
  return cardElement;
};


const userInfo = new UserInfo(inputNameProfile, inputProfession);

const userInfoPopup = new PopupWithForm('.popup_type_profile', (data) => {
  userInfo.setUserInfo(data);
});

const newCardPopup = new PopupWithForm('.popup_type_add', (formValues) => {
    cardList.addItem(createCard(formValues));
  }
);


const imagePopup = new PopupWithImage('.popup_type_place');




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
  jobInput.value = userData.about;
  userInfoPopup.open();
});
