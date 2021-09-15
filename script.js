const openPopupButton = document.querySelector('.profile__open-popup');
const profilePopup = document.querySelector('.popup_type_profile');
const closePopupButton = document.querySelector('.popup__close-popup');

const profileForm = document.querySelector('.popup__container');

const nameInput = profileForm.querySelector('.popup__text_type_name');
const jobInput = profileForm.querySelector('.popup__text_type_profession');

const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__profession');


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const templateContainer = document.getElementById('elements-container');

 function createCard (element) {
   const card = document.getElementById('elements-template').content.cloneNode(true);
   const cardName = card.querySelector('.element__text');
   const cardImage = card.querySelector('.element__image');

   cardName.textContent = element.name;
   cardImage.setAttribute('src', element.link);

   const likeButton = card.querySelector('.element__like-button');

   function addLike() {
     likeButton.classList.toggle('element__like-button_active');
   }

   likeButton.addEventListener('click', addLike);

    const deleteButton = card.querySelector('.element__delete-button');

    deleteButton.addEventListener('click', function(){
      const deleteElement = deleteButton.closest('.element');
      deleteElement.remove();
    });

    const placePopup = document.querySelector('.popup_type_place');
    const placeImage = placePopup.querySelector('.popup__image');
    const placeName = placePopup.querySelector('.popup__image-name');

    cardImage.addEventListener('click', function(event){
      placeImage.src = event.target.src;
      placeName.textContent = event.target.closest('.element').querySelector('.element__text').textContent;
      openPopup(placePopup);
    });

    return card;
   };

initialCards.forEach(function(element) {
  const template = createCard(element);
  templateContainer.append(template);
});

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function submitProfileForm (event) {
  event.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(profilePopup);
}

function editProfile () {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

function openProfilePopup () {
  openPopup(profilePopup);
  editProfile();
}

function closePopup (popup) {
  popup.classList.remove('popup_opened');
}

openPopupButton.addEventListener('click', openProfilePopup);
closePopupButton.addEventListener('click', function(){
  closePopup(profilePopup);
});

profileForm.addEventListener('submit', submitProfileForm);

const openAddPopupButton = document.getElementById('profile__add-button');
const popupCard = document.getElementById('popup_type_add');
const closeAddPopupButton = popupCard.querySelector('.popup__close-popup');
const saveButton = popupCard.querySelector('.popup__save-button');

const cardForm = popupCard.querySelector('.popup__edit-form');
const placeName = popupCard.querySelector('.popup__text_type_name');
const placeLink = popupCard.querySelector('.popup__text_type_link');

openAddPopupButton.addEventListener('click', function() {
  openPopup(popupCard);
});
closeAddPopupButton.addEventListener('click', function(){
  closePopup(popupCard);
});

function submitCardForm (event) {
  event.preventDefault();
  const element = {name: placeName.value, link: placeLink.value};
  templateContainer.prepend(createCard(element));
  closePopup(popupCard);
}

cardForm.addEventListener('submit', submitCardForm);

const placePopup = document.querySelector('.popup_type_place');
const placeCloseButton = placePopup.querySelector('.popup__close-popup');

placeCloseButton.addEventListener('click', function(){
  closePopup(placePopup);
});
