import React from 'react';
import api from '../utils/api.js';
import Card from './Card.js';

function Main(props) {
  const [userName, setUserName] = React.useState('Имя пользователя');
  const [userDescription, setUserDescription] = React.useState('Краткая информация о пользователе');
  const [userAvatar, setUserAvatar] = React.useState('#');
  const [userId, setUserId] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
        setUserId(res._id);
        if (res._id) {
          api.getAllCards()
            .then((res) => {
              setCards(res);
            })
            .catch((err) => {
              props.onErrorPopup(`Ошибка при загрузке карточек с сервера: ${err}.`);
            });
        }
      })
      .catch((err) => {
        props.onErrorPopup(`Ошибка при загрузке данных пользователя с сервера: ${err}.`);
      });
  }, []);

/*Бодрого времени суток. Вынес обработчики из функционального компонента Card, чтобы не плодить их
при каждом создании экземпляра карточки. Если это не нарушает правил, хотел бы
попросить коментарий по этому поводу. Также прошу коментарий, опять же если это разрешено,
по поводу key, это не пропс, а присвоение ключа экземпляру вызываемого компонента, 
вместо присвоения ключа возвращаемому элементу разметки, хотелось бы знать на сколько корректно
подобное присвоение ключа, уровнем выше, я пока не смог найти конкретной информации
по этому вопросу и пришёл к решению проблемы эмпирическим путём. Спасибо за "можно лучше", 
не приходил в голову такой вариант использования, постораюсь запомнить =) и обязательно, на днях,
изучу Date подетальней*/

/*Если мой манифест противоречит имеющимся правилам и сложившимся традициям, прошу его игнорировать 0_щ*/

  function checkUserLike(card) {
    return card.likes.some(like => like._id === userId)
  };

  function handleClickImg(card) {
    props.onCardClick({ name: card.name, link: card.link });
  }

  function handleClickUrn(dellCard) {
    props.onConfirmationPopup();
    props.dellCardId(dellCard._id);
  }

  const listOfCards = cards.map((card) => <Card card={card}
    key={card._id}
    userId={userId}
    onCardClick={handleClickImg}
    onUrn={handleClickUrn}
    checkUserLike={checkUserLike}
  />);

  return (
    <main className="content">

      <section className="profile">
        <div className="profile__box">
          <div className="profile__avatar-box" onClick={props.onEditAvatar}>
            <img className="profile__avatar" src={userAvatar} alt="Аватарка" />
          </div>
          <div className="profile__bio">
            <div className="profile__wrap">
              <h1 className="profile__name">{userName}</h1>
              <p className="profile__info">{userDescription}</p>
            </div>
            <button type="button" className="profile__edit-button button-opacity" onClick={props.onEditProfile}></button>
          </div>
        </div>
        <button type="button" className="profile__add-button button-opacity" onClick={props.onAddPlace}></button>
      </section>
      <section className="gallery" aria-label="Фото галерея">
        <ul className="gallery__cards">
          {listOfCards}
        </ul>
      </section>

    </main>
  );
}

export default Main;

