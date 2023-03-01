import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import ErrorPopup from './ErrorPopup.js';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ tugle: false, data: {} });
  const [isErrorPopupOpen, setIsErrorPopupOpen] = React.useState({ tugle: false, errorText: '' });
  const [dellCardId, setDellCardId] = React.useState('');

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleDellCardId = (dellCardId) => {
    setDellCardId(dellCardId)
  };

  const handleConfirmationPopupOpen = () => {
    setIsConfirmationPopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard({ tugle: true, data: card });
  };

  const handleErrorPopupOpen = (newErrorText) => {
    setIsErrorPopupOpen({ tugle: true, errorText: newErrorText });
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setSelectedCard({ tugle: false, data: {} });
    setIsErrorPopupOpen({ tugle: false, errorText: '' });
  };

  const handleCloseEvent = (evt) => {
    if (evt.type === 'click') {
      const isOverlay = evt.target.classList.contains('popup');
      const isCloseButton = evt.target.classList.contains('popup__close-button');
      if (isOverlay || isCloseButton) {
        closeAllPopups();
      };
    } else if (evt.type === 'keydown') { if (evt.key === 'Escape') { closeAllPopups(); } };
  };

  return (
    <div className="page" onKeyDown={evt => { evt.key === 'Escape' && closeAllPopups() }}>
      <Header />
      <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick} onErrorPopup={handleErrorPopupOpen} onCardClick={handleCardClick}
        onConfirmationPopup={handleConfirmationPopupOpen} dellCardId={handleDellCardId} />
      <Footer />
      <PopupWithForm name='edit-avatar' title='Обновить аватар' buttonText='Сохранить' isOpen={isEditAvatarPopupOpen} onClose={handleCloseEvent}>
        <fieldset className="popup__personal-data">
          <input type="url" name="avatar" id="avatar-input" className="popup__text-box popup__text-box_type_avatar-src"
            defaultValue="" placeholder="Ссылка на аватар" required />
          <span className="popup__text-box-error avatar-input-error"></span>
        </fieldset>
      </PopupWithForm>
      <PopupWithForm name='edit' title='Редактировать профиль' buttonText='Сохранить' isOpen={isEditProfilePopupOpen} onClose={handleCloseEvent}>
        <fieldset className="popup__personal-data">
          <input type="text" name="username" id="username-input" className="popup__text-box popup__text-box_type_name"
            defaultValue="" placeholder="Имя" required minLength="2" maxLength="40" />
          <span className="popup__text-box-error username-input-error"></span>
          <input type="text" name="occupation" id="occupation-input" className="popup__text-box popup__text-box_type_info"
            defaultValue="" placeholder="Личная информация" required minLength="2" maxLength="200" />
          <span className="popup__text-box-error occupation-input-error"></span>
        </fieldset>
      </PopupWithForm>
      <PopupWithForm name='add' title='Новое место' buttonText='Создать' isOpen={isAddPlacePopupOpen} onClose={handleCloseEvent}>
        <fieldset className="popup__personal-data">
          <input type="text" name="title" id="title-input" className="popup__text-box popup__text-box_type_title" defaultValue=""
            placeholder="Название" required minLength="2" maxLength="30" />
          <span className="popup__text-box-error title-input-error"></span>
          <input type="url" name="img" id="img-src-input" className="popup__text-box popup__text-box_type_img-src"
            defaultValue="" placeholder="Ссылка на картинку" required />
          <span className="popup__text-box-error img-src-input-error"></span>
        </fieldset>
      </PopupWithForm>
      <PopupWithForm name='confirmation' title='Вы уверены?' buttonText='Да' isOpen={isConfirmationPopupOpen} onClose={handleCloseEvent} />
      <ImagePopup card={selectedCard} onClose={handleCloseEvent} />
      <ErrorPopup errorText='' isOpen={isErrorPopupOpen} onClose={handleCloseEvent} />
    </div>
  );
}

export default App;