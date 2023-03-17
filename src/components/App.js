import React from 'react';

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';
import ErrorPopup from './ErrorPopup.js';
import api from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

/*Бодрого времени суток. Очень не хотелось отступать и возвращать машинную валидацию,
 а потому с ней я вроде справился, правда как то криво и топорненько, 
 но уже не соображаю как можно улучшить, а скоро на работу 0_щ, буду благодарен за ссылку на эту тему.
 К сожалению не разобрался с пунктом можно лучше, у меня, как и у других возникла проблема 
 с асинхронностью и с тем, что сет отдаёт предпоследнее значение и я его не могу дальше обработать, к сожалению в предоставленной ссылке,
 как мне показалось, эта тема раскрыта так себе, а хочется понимать как этим пользоваться, потому прошу, если есть возможность, ссылку, 
 раскрывающую эту тему несколько подробней, в любом случае спасибо ;-) И вообще, больше ссылок хороших и по возможности понятных =)*/ 

/* P.S. Да, чуть не забыл, огромное спасибо за if, как то я его умудрился проморгать =) */


 /*Если мой манифест противоречит имеющимся правилам и сложившимся традициям, прошу его игнорировать 0_щ*/  

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({ tugle: false, data: {} });
  const [dellCardId, setDellCardId] = React.useState('');
  const [isErrorPopupOpen, setIsErrorPopupOpen] = React.useState({ tugle: false, errorPopupText: '' });
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');
  const [submitButtonText, setSubmitButtonText] = React.useState('');

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
    setSubmitButtonText('Сохранить');
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
    setSubmitButtonText('Сохранить');
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
    setSubmitButtonText('Создать');
  };

  const handleDellCardId = (dellCardId) => {
    setDellCardId(dellCardId)
  };

  const handleConfirmationPopupOpen = () => {
    setIsConfirmationPopupOpen(true);
    setSubmitButtonText('Ок');
  };

  const handleCardClick = (card) => {
    setSelectedCard({ tugle: true, data: card });
  };

  const handleErrorPopupOpen = (newErrorPopupText) => {
    setIsErrorPopupOpen({ tugle: true, errorPopupText: newErrorPopupText });
  };

  const closeAllPopups = () => {
    setErrorText(``);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setSelectedCard({ tugle: false, data: {} });
    setIsErrorPopupOpen({ tugle: false, errorPopupText: '' });
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

  React.useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        setCurrentUser(res);
        if (res._id) {
          api.getAllCards()
            .then((res) => {
              setCards(res);
            })
            .catch((err) => {
              handleErrorPopupOpen(`Ошибка при загрузке карточек с сервера: ${err}.`);
              setCards([]);
            });
        }
      })
      .catch((err) => {
        handleErrorPopupOpen(`Ошибка при загрузке данных пользователя с сервера: ${err}.`);
        setCurrentUser({});
        setCards([]);
      });
  }, []);

  const checkUserLike = (card) => {
    return card.likes.some(like => like._id === currentUser._id)
  };

  const handleCardLike = (card) => {

    const isLiked = checkUserLike(card) ? 'delCardLike' : 'putCardLike';

    api[isLiked](card._id)
      .then((newCard) => {
        setCards(cards.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        const isLiked = checkUserLike(card) ? 'Ошибка при удалении лайка карточки с сервера:' : 'Ошибка при добавлении лайка карточки на сервер:';
        handleErrorPopupOpen(`${isLiked} ${err}.`);
      });
  };

  const handleDellCard = (evt) => {
    evt.preventDefault()
    setErrorText(``);
    setSubmitButtonText('Удаление...');
    api.delCard(dellCardId)
      .then(() => {
        setCards(cards.filter((c) => c._id !== dellCardId));
        closeAllPopups();
      })
      .catch((err) => {
        setErrorText(`Ошибка при удалении карточки с сервера: ${err}.`);
      })
      .finally(() => {
        setSubmitButtonText('Ок');
      });
  };

  const handleAddCard = ({ name, link }) => {
    setErrorText(``);
    if (currentUser._id) {
      setSubmitButtonText('Создание...');
      api.postNewCard({ name, link })
        .then((newCard) => {
          setCards([newCard, ...cards]);
          closeAllPopups();
        })
        .catch((err) => {
          setErrorText(`Ошибка при загрузке новой карточки на сервер: ${err}.`);
        })
        .finally(() => {
          setSubmitButtonText('Создать');
        });
    } else {
      setErrorText(`Ошибка при загрузке новой карточки на сервер вызваная некорреректной загрузкой данных пользователя.`);
    };
  }

  const handleUpdateUser = ({ name, about }) => {
    setErrorText(``);
    if (currentUser._id) {
      setSubmitButtonText('Сохранение...');
      api.patchUserInfo({ name, about })
        .then((res) => {
          setCurrentUser(res);
          closeAllPopups();
        })
        .catch((err) => {
          setErrorText(`Ошибка при перезаписи данных пользователя: ${err}.`);
        })
        .finally(() => {
          setSubmitButtonText('Сохранить');
        });
    } else {
      setErrorText(`Ошибка при загрузке новых данных на сервер вызваная некорреректной загрузкой данных пользователя.`);
    }
  };

  const handleUpdateUserAvatar = ({ avatar }) => {
    setErrorText(``);
    if (currentUser._id) {
      setSubmitButtonText('Сохранение...');
      api.patchUserAvatar({ avatar })
        .then((res) => {
          setCurrentUser(res);
          closeAllPopups();
        })
        .catch((err) => {
          setErrorText(`Ошибка при перезаписи аватара пользователя: ${err}.`);
        })
        .finally(() => {
          setSubmitButtonText('Сохранить');
        });
    } else {
      setErrorText(`Ошибка при загрузке новых данных на сервер вызваная некорреректной загрузкой данных пользователя.`);
    }
  };

  return (
    <div className="page" onKeyDown={evt => { evt.key === 'Escape' && closeAllPopups() }}>
      <Header />
      <CurrentUserContext.Provider value={currentUser}>
        <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick} onErrorPopup={handleErrorPopupOpen} onCardClick={handleCardClick}
          onConfirmationPopup={handleConfirmationPopupOpen} dellCardId={handleDellCardId}
          cards={cards} checkUserLike={checkUserLike} onCardLike={handleCardLike} />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={handleCloseEvent} onUpdateUser={handleUpdateUser}
          buttonText={submitButtonText} errorText={errorText} />
      </CurrentUserContext.Provider>
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={handleCloseEvent} onUpdateUserAvatar={handleUpdateUserAvatar}
        buttonText={submitButtonText} errorText={errorText} />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={handleCloseEvent} onAddPlace={handleAddCard}
        buttonText={submitButtonText} errorText={errorText} />
      <PopupWithForm name='confirmation' title='Вы уверены?' buttonText={submitButtonText} errorText={errorText}
        isOpen={isConfirmationPopupOpen} onClose={handleCloseEvent} onSubmit={handleDellCard} isValid={true} />
      <ImagePopup card={selectedCard} onClose={handleCloseEvent} />
      <ErrorPopup isOpen={isErrorPopupOpen} onClose={handleCloseEvent} />
      <Footer />
    </div>
  );
}

export default App;