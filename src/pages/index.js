import './index.css';

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import { PopupForDelete } from '../components/PopupForDelete';

import {
  initialCardsReversed,
  config,
  containerSelector,
  nameInput,
  jobInput,
  openAddPopupButton,
  openPopupButton,
  userNameElement,
  userAboutElement,
  userAvatarElement
}  from "../utils/components.js"

const api = new Api({
  url:'https://nomoreparties.co/v1/cohort-30',
  headers:{
    authorization: '6cb839ab-b14f-43d1-9065-67e2d1df3e24',
    'Content-Type': 'application/json'
  }
});

const validatedProfileForm = new FormValidator(config, document.querySelector('#personal-info'));

const validatedAddForm = new FormValidator(config, document.querySelector('#place-info'));

const validatedAvatarForm = new FormValidator(config, document.querySelector('#avatar-info'));

let userId = null;

Promise.all([api.getCards(), api.getUserInfo()])
   .then(([cardData, userData]) => {
     userId = userData._id;
     cardList.renderItems(cardData);
     userInfo.setUserInfo(userData);
     userInfo.setUserAvatar(userData);


     console.log('Данные карточек', cardData);
    //  console.log('Данные пользователя', userData);
   })
   .catch((err) => console.log('Ошибка', err))

const cardList = new Section({
  // items: initialCardsReversed,
  renderer: (element) => {
    cardList.addItem(createCard(element));
  }
},
containerSelector
);


function createCard(element) {
  console.log(element.likes);
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
          .catch((err) => console.log('Ошибка', err))
        } else {
          api.setCardLike(card.id)
          .then(cardData => card.setLikes(cardData.likes))
          .catch((err) => console.log('Ошибка', err))
        }
      },
      handleDeleteCard: (card) => {
        deletePopup.open();
        deletePopup.setActionSubmit(() => {
          api.deleteCard(card.id)
            .then(() => {
              card.destroy();
              deletePopup.close();
            })
            .catch((err) => console.log('Ошибка', err))
        })
      }
    });

  const cardElement = card.generateCard();
  return cardElement;
};

const deletePopup = new PopupForDelete('.popup_type_delete');
deletePopup.setEventListeners();

const userInfo = new UserInfo(userNameElement, userAboutElement, userAvatarElement);

openPopupButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.about;
  userInfoPopup.open();
});

const userInfoPopup = new PopupWithForm('.popup_type_profile', (data) => {
    userInfoPopup.renderLoading(true);
    api.editUserInfo(data)
      .then(() => {
        userInfo.setUserInfo(data);
        userInfoPopup.close();
      })
      .catch((err) => console.log('Ошибка', err))
      .finally(() => {
        userInfoPopup.renderLoading(false);
      })
    }

);

const newCardPopup = new PopupWithForm('.popup_type_add', (formValues) => {
  // console.log(formValues)
  newCardPopup.renderLoading(true);
  api.addNewCard(formValues)
     .then((res) => {
      //  console.log(res);
       const addedCard = createCard(res);
       cardList.addItem(addedCard);
       newCardPopup.close();
    })
    .catch((err) => console.log('Ошибка', err))
    .finally(() => {
     newCardPopup.renderLoading(false);
    })
  }
);

const editAvatarButton = document.querySelector('.profile__avatar-edit');
editAvatarButton.addEventListener('click', () => {
  validatedAvatarForm.resetValidation();
  newAvatarPopup.open();
})

const newAvatarPopup = new PopupWithForm('.popup_type_avatar', ({link}) => {
  newAvatarPopup.renderLoading(true);
  // console.log(link);
  api.editAvatar(link)
    .then((userData) => {
      userInfo.setUserAvatar(userData);
      newAvatarPopup.close();
    })
    .catch((err) => console.log('Ошибка', err))
    .finally(() => {
      newAvatarPopup.renderLoading(false);
    })
});

newAvatarPopup.setEventListeners();




const imagePopup = new PopupWithImage('.popup_type_place');

validatedProfileForm.enableValidation();

validatedAddForm.enableValidation();

validatedAvatarForm.enableValidation();

imagePopup.setEventListeners();
userInfoPopup.setEventListeners();
newCardPopup.setEventListeners();

openAddPopupButton.addEventListener('click', () => {
  validatedAddForm.resetValidation();
  newCardPopup.open();
});


