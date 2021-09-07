const openPopupButton = document.querySelector('.profile__open-popup');
const popup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__close-popup');

const formElement = document.querySelector('.popup__container');

const nameInput = formElement.querySelector('.popup__text_type_name');
const jobInput = formElement.querySelector('.popup__text_type_profession');

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

 function create (element) {
   const template = document.getElementById('elements-template').content.cloneNode(true);
   const cardName = template.querySelector('.element__text');
   const cardImage = template.querySelector('.element__image');
   cardName.textContent = element.name;
   cardImage.setAttribute('src', element.link);
   const likeButton = template.querySelector('.element__like-button');
   const likeButtonImage = likeButton.querySelector('.element__like');
   likeButton.addEventListener('click', function(){
     const src = likeButtonImage.getAttribute('src');
     if (src === './image/Vector_heart.svg') {
      likeButtonImage.setAttribute('src', './image/Vector_heart_active.svg');
     }
     else {
      likeButtonImage.setAttribute('src', './image/Vector_heart.svg');
     }
    });

    const deleteButton = template.querySelector('.element__delete-button');

    deleteButton.addEventListener('click', function(){
      const deleteElement = deleteButton.closest('.element');
      deleteElement.remove();
    });

    const placePopup = document.querySelector('.popup_type_place');
    const placeImage = placePopup.querySelector('.popup__image');
    const placeCloseButton = placePopup.querySelector('.popup__close-popup');
    const placeName = placePopup.querySelector('.popup__image-name');

    function togglePlacePopup() {
    placePopup.classList.toggle('popup_opened');
    };

    cardImage.addEventListener('click', function(event){
      placeImage.src = event.target.src;
      placeName.textContent = event.target.closest('.element').querySelector('.element__text').textContent;

      togglePlacePopup();
    });

    placeCloseButton.addEventListener('click', function(){
      placePopup.classList.remove('popup_opened');
    });

    return template;
   };

initialCards.forEach(function(element) {
  const template = create(element);
  templateContainer.append(template);
});

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

function openPopup () {
  togglePopup();
  editProfile();
}

openPopupButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', togglePopup);

formElement.addEventListener('submit', formSubmitHandler);

const openAddPopupButton = document.getElementById('profile__add-button');
const AddPopup = document.getElementById('popup_type_add');
const closeAddPopupButton = AddPopup.querySelector('.popup__close-popup');
const saveButton = AddPopup.querySelector('.popup__save-button');

const formAddPopup = AddPopup.querySelector('.popup__edit-form');
const placeName = AddPopup.querySelector('.popup__text_type_name');
const placeLink = AddPopup.querySelector('.popup__text_type_link');

function toggleAddPopup() {
  AddPopup.classList.toggle('popup_opened');
}

openAddPopupButton.addEventListener('click',toggleAddPopup);
closeAddPopupButton.addEventListener('click',toggleAddPopup);

function AddPopupSubmit (event) {
  event.preventDefault();
  const element = {name: placeName.value, link: placeLink.value};
  templateContainer.prepend(create(element));
  toggleAddPopup();
}

formAddPopup.addEventListener('submit', AddPopupSubmit);
